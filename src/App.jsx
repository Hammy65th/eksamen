import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import News from "./pages/news";
import Podcast from "./pages/podcast";
import Sport from "./pages/sport";
import Vejr from "./pages/vejr";
import Admin from "./admin/admin";
import Login from "./admin/login";
import ArticlePage from "./pages/ArticlePage";
import VideoPage from "./pages/VideoPage";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black shadow">
        <nav className="container mx-auto flex items-center p-4 md:p-8 text-white justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/">..news</Link>
          </h1>

          {/* Burger Menu */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
          </button>

          {/* PC Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/nyheder" className="hover:text-blue-600">
                Nyheder
              </Link>
            </li>
            <li>
              <Link to="/sport" className="hover:text-blue-600">
                Sport
              </Link>
            </li>
            <li>
              <Link to="/vejr" className="hover:text-blue-600">
                Vejr
              </Link>
            </li>
            <li>
              <Link to="/podcast" className="hover:text-blue-600">
                Podcast
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-blue-600">
                Login
              </Link>
            </li>
          </ul>

          
          <div className="hidden md:block">
            <input
              className="bg-white text-black rounded-2xl p-1 text-center"
              type="text"
              placeholder="Søg på News"
            />
          </div>
        </nav>

        {/* Mobil menu */}
        {menuOpen && (
          <div className="md:hidden bg-white text-black px-4 pb-4">
            <ul className="flex flex-col gap-3">
              <li className="pt-2">
                <input
                  className="bg-white text-black rounded-2xl p-1 text-center w-full mt-2 border border-black"
                  type="text"
                  placeholder="Søg på News"
                />
              </li>
              <li>
                <Link
                  to="/nyheder"
                  className="hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Nyheder
                </Link>
              </li>
              <li>
                <Link
                  to="/sport"
                  className="hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Sport
                </Link>
              </li>
              <li>
                <Link
                  to="/vejr"
                  className="hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Vejr
                </Link>
              </li>
              <li>
                <Link
                  to="/podcast"
                  className="hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/nyheder" element={<News />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/vejr" element={<Vejr />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </main>

      <footer className="bg-black text-white">
        
        <div className="hidden md:flex p-8 flex-wrap justify-center gap-6 max-w-[1000px] mx-auto">
          <div className="flex-1 min-w-[150px]">
            <h1 className="font-bold mb-2">Nyheder</h1>
            <p>Seneste Nyt</p>
            <p>Internationalt</p>
            <p>Sport</p>
            <p>Vejret</p>
          </div>

          <div className="flex-1 min-w-[150px]">
            <h1 className="font-bold mb-2">Lorem Ipsum Dolor</h1>
            <p>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>

          <div className="flex-1 min-w-[150px]">
            <h1 className="font-bold mb-2">Lorem Ipsum Dolor</h1>
            <p>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>

          <div className="flex-1 min-w-[150px] mb-5">
            <h1 className="font-bold mb-2">Om NEWS</h1>
            <p>Nyt fra NEWS</p>
            <p>Job i NEWS</p>
            <p>Presse</p>
            <p>Vilkår på NEWS</p>
            <p>Etik og rettelser</p>
            <p>Privatlivspolitik</p>
          </div>
        </div>

        
        <div className="bg-white p-1"></div>

        
        <div className="bg-black p-3">
          <p className="text-center text-lg">
            Lorem ipsum dolor sit amet, consecteturindolore ultrices | TLF: 12
            34 56 78
          </p>
        </div>
      </footer>
    </div>
  );
}
