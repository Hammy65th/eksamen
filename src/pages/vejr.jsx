import React, { useEffect } from "react";
import useRequestData from "../components/useRequestData";
import { Link } from "react-router-dom";

const Weather = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:3001/article/section/vejr");
  }, []);

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

    return "No description";
  };

  const getImageURL = (article) => {
    const imageContent = article?.content.find((item) => item.type === "image");
    return imageContent?.url
      ? `http://localhost:3001/assets/images/${imageContent.url}`
      : null;
  };

  if (isLoading)
    return <div className="text-center text-gray-500 py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Failed to load data.</div>;

  const articles = Array.isArray(data) ? data.slice(0, 3) : [];

  if (articles.length < 3) {
    return <div className="text-center text-gray-500 py-10">Not enough weather articles.</div>;
  }

  const [article1, article2, article3] = articles;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{article1.title}</h1>
        <span className="text-sm font-semibold text-blue-600">Vejr</span>
              <span className="text-sm text-gray-500 ml-2">Opdateret for nylig</span>
        
      </div>


      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

        <div className="md:col-span-3">
          <Link to={`/article/${article1._id}`} className="block group">
            <img
              src={getImageURL(article1)}
              alt={article1.title}
              className="w-full h-auto md:h-[300px] object-cover transition"
            />
          </Link>
        </div>


        <div className="md:col-span-3 flex flex-col gap-6">
          {[article2, article3].map((article) => (
            <Link
              key={article._id}
              to={`/article/${article._id}`}
              className="flex gap-4 group"
            >
              <div className="flex-1">
                <div className="mb-1">
                  <span className="text-xs font-semibold text-blue-600">Vejr</span>
                  <span className="text-xs text-gray-500 ml-2">Opdateret for nylig</span>
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
                className="w-fit h-34 object-cover  shrink-0 shadow"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
