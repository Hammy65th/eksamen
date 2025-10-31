import React, { useEffect, useState } from "react";

const PodcastSlider = () => {
  // State til opbevaring af podcasts hentet fra API
  const [podcasts, setPodcasts] = useState([]);
  
  // State til at tracke hvilket podcast-slide der vises
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Loader state mens API-kald er i gang
  const [isLoading, setIsLoading] = useState(true);
  
  // Error state hvis fetch fejler
  const [error, setError] = useState(null);

  // useEffect kalder API'et én gang ved mount
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://localhost:3001/podcast/");
        if (!response.ok) throw new Error("Failed to fetch podcasts");

        const data = await response.json();

        // Gem kun de første 3 podcasts i state
        setPodcasts(data.slice(0, 3));
      } catch (err) {
        setError(err.message); // Sæt fejl hvis fetch fejler
      } finally {
        setIsLoading(false); // Stop loader uanset success eller fejl
      }
    };
    fetchPodcasts();
  }, []);

  // Funktion til at gå til næste slide i slideren
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % podcasts.length);

  // Funktion til at gå til forrige slide
  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? podcasts.length - 1 : prev - 1
    );

  // Loader vises mens data hentes
  if (isLoading)
    return <div className="text-center text-gray-500 py-10">Loading podcasts...</div>;

  // Fejl vises hvis fetch fejler
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  // Hvis der ikke er podcasts tilgængelige
  if (podcasts.length === 0)
    return <p className="text-gray-500 text-center">Ingen podcasts tilgængelige</p>;

  // Aktuelt podcast baseret på currentIndex
  const currentPodcast = podcasts[currentIndex];

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Slider container */}
      <div className="flex flex-col sm:flex-row items-start gap-4 border p-4 bg-white shadow-md">

        <img
          src={`http://localhost:3001/assets/podcast/${currentPodcast.thumbnail}`}
          alt={currentPodcast.headline}
          className="w-full sm:w-64 h-40 object-cover"
        />

 
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl font-bold">{currentPodcast.headline}</h2>
          <p className="text-gray-700">{currentPodcast.info}</p>

          {/* Audio player */}
          <audio
            controls
            className="w-full mt-4"
            src={`http://localhost:3001/assets/podcast/${currentPodcast.podcast}`}
          >
            Your browser does not support the audio element.
          </audio>
        </div>


        <div className="w-full sm:w-64 h-40 text-black p-4 flex items-center justify-center bg-gray-100">
          Lorem ipsum dolor sit amet, ius et persecuti posidonium, mazim facilisi
          ocurreret sed in.
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-6 gap-6">
        <button
          onClick={prevSlide}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default PodcastSlider;

//* Kommentarer:  
//* 1. useState holder podcasts, currentIndex, loader og error state.  
//* 2. useEffect henter podcasts fra API ved mount.  
//* 3. Kun de første 3 podcasts vises for at begrænse slideren.  
//* 4. nextSlide / prevSlide opdaterer currentIndex cirkulært.  
//* 5. Conditional rendering håndterer loading, error og tomme data.  
//* 6. Audio-element bruger src fra API for at afspille podcast.  
//* 7. Layout er responsive med flex og sm: breakpoint for thumbnails/info.  
