import React, { useEffect } from "react";
import useRequestData from "../components/useRequestData"; // adjust path if needed

const Podcast = () => {
  // Brug custom hook til API kald
  const { makeRequest, isLoading, data, error } = useRequestData();

  // useEffect kører ved første render
  useEffect(() => {
    makeRequest("http://localhost:3001/podcast/");
  }, []);

  // Loader vises mens data hentes
  if (isLoading)
    return <div className="text-center text-gray-500 py-10">Loading...</div>;

  // Fejl vises hvis fetch fejler
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Der opstod en fejl under hentning af podcasts.
      </div>
    );

  // Data fallback – hvis ingen podcasts
  if (!data || data.length === 0)
    return <div className="text-center text-gray-500 py-10">Ingen podcasts fundet.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header med billede og tekst overlay */}
      <div className="relative w-full overflow-hidden shadow-lg mb-12">
        <img
          src={`http://localhost:3001/assets/images/podcast_1.jpg`}
          alt="Podcast Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-5 bg-[#d79d00] text-white p-4">
          <h1 className="text-3xl font-bold">Podcasts</h1>
          <p className="text-white text-sm">Lyt til de seneste episoder</p>
        </div>
      </div>

      {/* Liste af podcasts */}
      <div className="flex flex-col gap-8">
        {data.map((podcast) => (
          <div
            key={podcast._id}
            className="flex flex-col sm:flex-row items-start gap-4 border p-4"
          >
            {/* Thumbnail billede */}
            <img
              src={`http://localhost:3001/assets/podcast/${podcast.thumbnail}`}
              alt={podcast.headline}
              className="w-full sm:w-64 h-40 object-cover"
            />

            {/* Podcast information */}
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-xl font-bold">{podcast.headline}</h2>
              <p className="text-gray-700">{podcast.info}</p>

              <audio
                controls
                className="w-full mt-12"
                src={`http://localhost:3001/assets/podcast/${podcast.podcast}`}
              >
                Your browser does not support the audio element.
              </audio>
            </div>

            {/* Ekstra tekst boks */}
            <div className="w-full sm:w-64 h-40 text-black p-4 flex items-center justify-center sm:ml-auto">
              Lorem ipsum dolor sit amet, ius et persecuti posidonium, mazim
              facilisi ocurreret sed in. Ad vim autem dicant omnesque, vix at
              mutat petentium disputando.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;

//* Podcast komponent henter podcasts via useRequestData hook og håndterer loader og fejl.

