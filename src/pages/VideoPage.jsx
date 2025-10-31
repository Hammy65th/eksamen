import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequestData from "../components/useRequestData";
import LatestArticles from "../components/latestarticle";
import PodcastSlider from "../components/podcastslider";

const VideoPage = () => {
  // useParams henter id fra URL'en (fx /video/123)
  const { id } = useParams();

  // useNavigate giver os mulighed for at navigere tilbage i browserhistorikken
  const navigate = useNavigate();

  // bruger custom hook til API-kald
  // makeRequest = funktion til at kalde API
  // isLoading = loader state
  // data = data vi modtager
  // error = fejl state
  const { makeRequest, isLoading, data, error } = useRequestData();

  // useEffect kaldes ved mount + hvis id ændres
  useEffect(() => {
    // kalder API'et for denne specifikke video
    makeRequest(`http://localhost:3001/video/${id}`);
  }, [id]);

  // Loader vises mens API-kaldet henter data
  if (isLoading)
    return (
      <div className="text-center text-gray-500 py-10">
        Loading video...
      </div>
    );

  // Fejl vises hvis API-kaldet fejler
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load video.
      </div>
    );

  // Ingen data fundet
  if (!data)
    return (
      <div className="text-center text-gray-500 py-10">
        No video found.
      </div>
    );

  // Gemmer video data lokalt for nem adgang
  const video = data;

  // Dynamiske URLs til video og thumbnail
  const videoSrc = `http://localhost:3001/assets/video/${video.url}`;
  const thumbnailSrc = `http://localhost:3001/assets/images/${video.thumbnail}`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">


      <h1 className="text-4xl font-bold mb-2">{video.title}</h1>

      {/* Video Metadata */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span className="font-semibold text-blue-600 mr-2">Video</span>
        <span>•</span>
        <span className="ml-2">
          {/* Hvis duration findes, vises minutter ellers "Ukendt varighed" */}
          {video.duration ? `${Math.round(video.duration / 60)} min` : "Ukendt varighed"}
        </span>
      </div>

      {/* Video afspiller */}
      <div className="mb-6 shadow-md">
        <video
          controls
          poster={thumbnailSrc} // thumbnail vises inden video afspilles
          className="w-full h-[450px] object-cover rounded"
        >
          <source src={videoSrc} type="video/mp4" />
          Din browser understøtter ikke videoafspilning.
        </video>
      </div>

      {/* Video beskrivelse */}
      <p className="text-lg text-gray-800 mb-8">{video.description}</p>

      {/* Seneste Artikler */}
      <div className="mt-16">
  
        <LatestArticles />
      </div>

      {/* Podcasts */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-6">Podcasts</h2>

        <PodcastSlider />
      </div>

      {/* Tilbage-knap */}
      <div className="mt-10">
        <button
          onClick={() => navigate(-1)} // navigerer tilbage i browser historik
          className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition"
        >
          Tilbage
        </button>
      </div>
    </div>
  );
};

export default VideoPage;

//* VideoPage henter en enkelt video fra API'et ved hjælp af useRequestData.
//* Loader, fejl og "no data" håndteres separat for bedre UX.
//* Seneste artikler og podcasts er separate, genbrugelige komponenter.
//* navigate(-1) bruges i stedet for Link for at bevare browserhistorik dynamisk.
//* Dynamiske URL'er til video og thumbnail konstrueres fra API-data.
//* Kommentarer er tilføjet ved kritiske logiske steder for at forklare handlingen.
