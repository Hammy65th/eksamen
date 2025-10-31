import React, { useEffect, useState } from "react";
import useRequestData from "../components/useRequestData";
import { Link } from "react-router-dom";
import PodcastSlider from "../components/podcastslider";
import LatestArticles from "../components/latestarticle";

const News = () => {
  // Custom hook til API-kald med state: isLoading, data og error
  const { makeRequest, isLoading, data, error } = useRequestData();

  // State til video-data, separat fra artikler
  const [videos, setVideos] = useState([]);

  // useEffect kalder både artikler og videoer ved mount
  useEffect(() => {
    makeRequest("http://localhost:3001/article"); // hent artikler
    fetchVideos(); // hent videoer
  }, []);

  // Funktion til at hente videoer fra API
  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:3001/video");
      const vidData = await res.json();
      setVideos(vidData);
    } catch (err) {
      console.error("Failed to load videos:", err);
    }
  };

  // Funktion til at hente første paragraph tekst fra artikel
  // Hvis paragraph ikke findes, prøv content i main.contentbody
  const getFirstParagraph = (content) => {
    const topParagraph = content.find((item) => item.type === "paragraph");
    if (topParagraph) return topParagraph.text;

    const mainContent = content.find((item) => item.type === "main");
    if (mainContent?.contentbody?.length) {
      const nestedParagraph = mainContent.contentbody.find(
        (item) => item.type === "paragraph"
      );
      if (nestedParagraph) return nestedParagraph.text;
    }

    return "No description"; // fallback hvis ingen tekst findes
  };

  // Funktion til at hente billede fra artikel
  const getImageURL = (article) => {
    const imageContent = article?.content.find((item) => item.type === "image");
    return imageContent?.url
      ? `http://localhost:3001/assets/images/${imageContent.url}`
      : null;
  };

  if (isLoading)
    return <div className="text-center text-gray-500 py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">Failed to load data.</div>
    );

  // Del artikler op i landing page og almindelige artikler
  const landingArticles = Array.isArray(data)
    ? data.filter((a) => a.isLandingpage).slice(0, 5)
    : [];

  const nonLandingArticles = Array.isArray(data)
    ? data.filter((a) => !a.isLandingpage).slice(0, 4)
    : [];

  // Hvis der ikke er nok landing artikler, vis fallback
  if (landingArticles.length < 5) {
    return (
      <div className="text-center text-gray-500 py-10">
        Not enough landing page articles.
      </div>
    );
  }

  // Destructure de første 5 landing artikler til grid
  const [article1, article2, article3, article4, article5] = landingArticles;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">

      <div className="mb-2">
        <h1 className="text-4xl font-bold">Ny grøn energiplan sat i værk</h1>
      </div>

      <div className="mb-2">
        <span className="text-sm font-semibold text-blue-600">Nyheder</span>
        <span className="text-sm text-gray-500 ml-2">24 minutter siden</span>
      </div>

      {/* Grid layout for de første 5 landing artikler */}
      <div className="grid grid-cols-1 md:grid-cols-6 mb-10 gap-6">


        <div className="md:col-span-3">
          <Link to={`/article/${article1._id}`} className="block">
            <img
              src={getImageURL(article1)}
              alt={article1.title}
              className="w-full h-auto md:h-[300px] object-cover shadow-md"
            />
          </Link>
        </div>


        <div className="md:col-span-3 flex flex-col gap-6">
          {[article2, article3].map((article) => (
            <Link
              key={article._id}
              to={`/article/${article._id}`}
              className="flex flex-col sm:flex-row gap-4 group"
            >
              <div className="flex-1">
                <div className="mb-1">
                  <span className="text-xs font-semibold text-blue-600">
                    Nyheder
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    24 minutter siden
                  </span>
                </div>
                <h3 className="font-semibold text-md text-gray-900 group-hover:text-gray-700 mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {getFirstParagraph(article.content)}
                </p>
              </div>
              <img
                src={getImageURL(article)}
                alt={article.title}
                className="w-full sm:w-40 h-30 object-cover shrink-0"
              />
            </Link>
          ))}
        </div>


        {[article4, article5].map((article) => (
          <div key={article._id} className="md:col-span-3 flex flex-col">
            <Link
              to={`/article/${article._id}`}
              className="overflow-hidden shadow-lg group flex flex-col h-full"
            >
              <img
                src={getImageURL(article)}
                alt={article.title}
                className="w-full h-64 sm:h-72 md:h-64 object-cover transform group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 p-4 bg-black flex flex-col justify-between">
                <p className="text-sm text-gray-200 line-clamp-3">
                  {getFirstParagraph(article.content)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>


      <LatestArticles articles={nonLandingArticles} getImageURL={getImageURL} />

      {/* Video sektion */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Video</h2>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            
            <div className="flex flex-col gap-6">
              {videos.slice(0, 3).map((vid) => (
                <Link
                  key={vid._id}
                  to={`/video/${vid._id}`}
                  className="flex flex-col sm:flex-row gap-4 bg-white overflow-hidden"
                >
                  <img
                    src={`http://localhost:3001/assets/images/${vid.thumbnail}`}
                    alt={vid.title}
                    className="w-full sm:w-40 h-32 object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between p-2">
                    <div>
                      <h3 className="font-semibold text-lg">{vid.title}</h3>
                      <p className="text-sm text-black line-clamp-2">
                        {vid.description || "Ingen beskrivelse"}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">Nyheder - 24 Minutter</p>
                  </div>
                </Link>
              ))}
            </div>


            {videos[3] && (
              <Link
                to={`/video/${videos[3]._id}`}
                className="relative overflow-hidden"
              >
                <img
                  src={`http://localhost:3001/assets/images/${videos[3].thumbnail}`}
                  alt={videos[3].title}
                  className="w-full h-60 sm:h-72 md:h-80 object-cover"
                />
                <div className="mt-3 text-black p-4 sm:p-6">
                  <h3 className="text-xl font-semibold mb-1">{videos[3].title}</h3>
                  <p className="text-sm line-clamp-2">
                    {videos[3].description || "Ingen beskrivelse"}
                  </p>
                  <p className="text-xs mt-2">Nyheder - 24 Minutter</p>
                </div>
              </Link>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Ingen videoer tilgængelige</p>
        )}
      </div>


      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-6">Podcasts</h2>
        <PodcastSlider />
      </div>
    </div>
  );
};

export default News;

//* Kommentarer:
//* 1. useRequestData bruges til at hente artikler med loader og error state.
//* 2. fetchVideos henter video-data separat.
//* 3. getFirstParagraph håndterer nested content fallback.
//* 4. Landing og non-landing artikler deles op for forskellige sektioner.
//* 6. LatestArticles genbruges til at vise de øvrige artikler.
//* 8. PodcastSlider til sidst på siden.

