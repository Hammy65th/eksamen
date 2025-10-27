import { Routes, Route, Link } from "react-router-dom";
import News from "./pages/news";
import Podcast from "./pages/podcast";
import Sport from "./pages/sport";
import Vejr from "./pages/vejr";
import Admin from "./admin/admin";
import Login from "./admin/login";

export default function App() {
  return (
    <div>
      <>
        <header className="bg-black shadow">
          <nav className="container mx-auto flex items-center p-8 text-white">
            
            <h1 className="text-2xl font-bold text-center">
              <Link to="/">..news</Link>
            </h1>

            <div className="flex-1 flex justify-center">
              <ul className="flex space-x-6">
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
            </div>

            <div>
              <input className="bg-white text-black rounded-2xl p-1 text-center" type="text" placeholder="Søg på News" />
            </div>

          </nav>
        </header>
      </>

      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/nyheder" element={<News />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/vejr" element={<Vejr />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}
