import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useRequestData from "../components/useRequestData";
import PodcastSlider from "../components/podcastslider";
import LatestArticles from "../components/latestarticle";

const ArticlePage = () => {
  // Henter article ID fra URL parametre
  const { id } = useParams();

  // Bruger custom hook til API-kald
  const { makeRequest, isLoading, data, error } = useRequestData();

  // useEffect kalder API'et ved mount eller hvis ID ændres
  useEffect(() => {
    makeRequest(`http://localhost:3001/article/id/${id}`);
  }, [id]);

  // Loader vises mens API-kald er i gang
  if (isLoading)
    return <div className="text-center text-gray-500 py-10">Loading article...</div>;

  // Fejl vises hvis fetch fejler
  if (error)
    return <div className="text-center text-red-500 py-10">Failed to load article.</div>;

  // Hvis ingen data returneres
  if (!data)
    return <div className="text-center text-gray-500 py-10">No article found.</div>;

  const article = data;

  // Funktion til at hente første billede fra article content
  const getImageURL = (article) => {
    const imageContent = article?.content.find((item) => item.type === "image");
    return imageContent?.url
      ? `http://localhost:3001/assets/images/${imageContent.url}`
      : null;
  };

  const firstImageUrl = getImageURL(article);

  // Find index på første billede så vi kan skippe det når vi renderer content
  const firstImageIndex = article.content.findIndex((item) => item.type === "image");

  // Henter “seneste artikler” hvis API returnerer dem (eller anden metode)
  const nonLandingArticles = Array.isArray(data?.otherArticles)
    ? data.otherArticles.filter((a) => !a.isLandingpage).slice(0, 4)
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">

      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>


      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span className="font-semibold text-blue-600 mr-2">
          {article.articleCategory || "Nyheder"}
        </span>
        <span>•</span>
        <span className="ml-2">
          {new Date(article.date).toLocaleDateString("da-DK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Første billede */}
      {firstImageUrl && (
        <img
          src={firstImageUrl}
          alt={article.title}
          className="w-full h-80 object-cover mb-6 shadow-md"
        />
      )}

      {/* Article Content */}
      <div className="text-lg text-gray-800 leading-relaxed space-y-4">
        {article.content.map((block, index) => {
          // Skip det første billede vi allerede har vist
          if (index === firstImageIndex) return null;


          if (block.type === "paragraph") return <p key={index}>{block.text}</p>;


          if (block.type === "header")
            return (
              <h2 key={index} className="text-2xl font-semibold mt-6 mb-2">
                {block.text}
              </h2>
            );

          // main content
          if (block.type === "main" && block.contentbody?.length > 0)
            return (
              <div key={index} className="space-y-4 my-6">
                {block.contentbody.map((inner, innerIndex) => (
                  <div key={innerIndex}>
                    {inner.headline && (
                      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
                        {inner.headline}
                      </h3>
                    )}

                    {/* Quote del*/}
                    {innerIndex === 1 ? (
                      <blockquote className="text-center italic text-gray-600 text-xl px-4 my-4">
                        “{inner.text}”
                      </blockquote>
                    ) : (
                      <p>{inner.text}</p>
                    )}
                  </div>
                ))}
              </div>
            );

          // Andre billeder i content
          if (block.type === "image")
            return (
              <img
                key={index}
                src={`http://localhost:3001/assets/images/${block.url}`}
                alt={block.altText || ""}
                className="w-full my-6"
              />
            );

          return null; // ignorer udefinerede typer
        })}
      </div>


      <div className="mt-20">
        <LatestArticles articles={nonLandingArticles} getImageURL={getImageURL} />
      </div>

  
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-6">Podcasts</h2>
        <PodcastSlider />
      </div>

      <Link
        to="/"
        className="bg-black left-4 text-white px-3 py-1 hover:bg-white hover:text-black rounded inline-block mt-6"
      >
        Tilbage
      </Link>
    </div>
  );
};

export default ArticlePage;

//* Kommentarer:  
//* 1. Custom hook useRequestData håndterer API-kald og loader/error state.  
//* 2. firstImageUrl + firstImageIndex bruges til at undgå duplikering af første billede.  
//* 3. Nested content håndteres via type “main” og contentbody array.  
//* 4. LatestArticles komponent genbruger artikel data og får getImageURL som prop.  
//* 5. PodcastSlider vises under seneste artikler.  
//* 6. Link komponent bruges til at navigere tilbage til oversigten.  
