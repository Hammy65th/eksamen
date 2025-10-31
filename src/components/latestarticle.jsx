import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  // State til opbevaring af de seneste artikler
  const [articles, setArticles] = useState([]);

  // useEffect henter artikler ved mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Hent alle artikler fra API
        const res = await fetch("http://localhost:3001/article");
        const data = await res.json();

        // Filtrer artikler som IKKE er landing page og tag de første 4
        const nonLanding = data.filter((a) => !a.isLandingpage).slice(0, 4);
        setArticles(nonLanding);
      } catch (err) {
        console.error("Failed to load latest articles:", err);
      }
    };
    fetchArticles();
  }, []);

  // Funktion til at hente billed-URL fra artikel
  // Hvis ingen billede findes, vises placeholder
const getImageURL = (article) => {
  const imageContent = article?.content.find((item) => item.type === "image");
  return imageContent?.url
    ? `http://localhost:3001/assets/images/${imageContent.url}`
    : null;
};

  // Return null hvis ingen artikler findes
  if (articles.length === 0) return null;

  return (
    <div>
      {/* Sektion titel */}
      <h2 className="text-2xl font-bold mb-6">Seneste</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article._id}`}
            className="flex flex-col bg-white overflow-hidden"
          >
            {/* Artikel billede */}
            <img
              src={getImageURL(article)}
              alt={article.title}
              className="w-full h-40 object-cover"
            />

            {/* Artikel tekst */}
            <div className="pt-2 flex flex-col flex-1">
              <p className="text-black text-sm line-clamp-3">
                {
                  // Prøv først at hente første paragraph
                  article.content.find((c) => c.type === "paragraph")?.text ||
                  // Hvis ingen paragraph, hent første tekst fra main.contentbody
                  article.content.find((c) => c.type === "main")?.contentbody[0]?.text ||
                  "No description" // fallback
                }
              </p>

              <div className="mb-1">
                <span className="text-xs font-semibold text-yellow-600">Nyheder</span>
                <span className="text-xs text-gray-500 ml-2">24 minutter siden</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;

//* Kommentarer:  
//* 1. useState holder seneste artikler som skal vises i grid.  
//* 2. useEffect kalder API'et ved mount for at hente artikler.  
//* 3. Filtrering fjerner landing page artikler og begrænser til 4 stk.  
//* 4. getImageURL håndterer fallback hvis artikel ikke har billede.  
//* 5. Fallback for tekst: paragraph først, derefter main.contentbody, ellers "No description".  
//* 6. line-clamp-3 begrænser tekst til 3 linjer i UI.  
//* 7. Link gør hele kortet klikbart og navigerer til artikel.  
