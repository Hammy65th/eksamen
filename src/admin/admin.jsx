import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

  // ----------------------
  // State til data
  // ----------------------
  // Liste af artikler
  const [articles, setArticles] = useState([]);
  // Liste af podcasts
  const [podcasts, setPodcasts] = useState([]);

  // State til at tilføje nye artikler
  const [newArticle, setNewArticle] = useState({
    title: "",
    articleCategory: "",
    section: "",
    author: "",
    isLandingpage: false,
  });

  // State til at tilføje nye podcasts
  const [newPodcast, setNewPodcast] = useState({
    headline: "",
    info: "",
    length: 0,
    thumbnail: "",
    podcast: "",
    releaseDate: "",
  });

  // State til at redigere podcasts
  const [editingPodcastId, setEditingPodcastId] = useState(null); // Id for podcast der redigeres
  const [editingPodcastData, setEditingPodcastData] = useState({}); // Data for podcast der redigeres

  // Sections til artikler
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(true); // Loader til sections

  // ----------------------
  // Protect Admin Page
  // ----------------------
  // Tjek login-status i localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) navigate("/login"); // Redirect hvis ikke logget ind
  }, [navigate]);

  // ----------------------
  // Fetch initial data
  // ----------------------
  useEffect(() => {
    fetchArticles();   // Hent artikler
    fetchSections();   // Hent sections
    fetchPodcasts();   // Hent podcasts
  }, []);

  // ----------------------
  // API-funktioner
  // ----------------------
  // Fetch alle artikler fra backend
  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/article");
      setArticles(res.data); // Opdater state med artikler
    } catch (err) {
      console.error("Failed to fetch articles", err);
    }
  };

  // Fetch sections og sorter efter position
  const fetchSections = async () => {
    try {
      const res = await axios.get("http://localhost:3001/article/section");
      const sorted = res.data.sort((a, b) => a.position - b.position);
      setSections(sorted);
    } catch (err) {
      console.error("Failed to fetch sections", err);
    } finally {
      setLoadingSections(false); // Stop loader
    }
  };

  // Fetch podcasts
  const fetchPodcasts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/podcast/");
      setPodcasts(res.data);
    } catch (err) {
      console.error("Failed to fetch podcasts", err);
    }
  };

  // ----------------------
  // Article-handlers
  // ----------------------
  // Slet artikel
  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`http://localhost:3001/article/delete/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id)); // Fjern fra UI
    } catch (err) {
      console.error("Failed to delete article", err);
    }
  };

  // Tilføj ny artikel
  const handleAddArticle = async () => {
    // Tjek required fields
    if (!newArticle.title || !newArticle.articleCategory || !newArticle.section || !newArticle.author) {
      alert("Please fill in all fields before adding a news article.");
      return;
    }

    const articleData = {
      title: newArticle.title,
      content: [{ type: "paragraph", text: "Sample paragraph" }], // Dummy content
      section: newArticle.section,
      articleCategory: newArticle.articleCategory,
      isLandingpage: newArticle.isLandingpage,
      tags: [],
      author: newArticle.author,
    };

    try {
      await axios.post("http://localhost:3001/article/add", articleData);
      alert("Article added successfully!");
      setNewArticle({ title: "", articleCategory: "", section: "", author: "", isLandingpage: false });
      fetchArticles(); // Opdater liste
    } catch (err) {
      console.error("Failed to add article", err);
      alert("Failed to add article");
    }
  };

  // ----------------------
  // Podcast-handlers
  // ----------------------
  // Slet podcast
  const handleDeletePodcast = async (id) => {
    if (!window.confirm("Are you sure you want to delete this podcast?")) return;
    try {
      await axios.delete(`http://localhost:3001/podcast/delete/${id}`);
      setPodcasts((prev) => prev.filter((p) => p._id !== id)); // Fjern fra UI
    } catch (err) {
      console.error("Failed to delete podcast", err);
    }
  };

  // Tilføj ny podcast
  const handleAddPodcast = async () => {
    if (!newPodcast.headline || !newPodcast.info || !newPodcast.length || !newPodcast.thumbnail || !newPodcast.podcast) {
      alert("Please fill in all podcast fields");
      return;
    }

    try {
      await axios.post("http://localhost:3001/podcast/add", newPodcast);
      alert("Podcast added successfully!");
      setNewPodcast({ headline: "", info: "", length: 0, thumbnail: "", podcast: "", releaseDate: "" });
      fetchPodcasts(); // Opdater liste
    } catch (err) {
      console.error("Failed to add podcast", err);
      alert("Failed to add podcast");
    }
  };

  // Start redigering af podcast
  const startEditingPodcast = (podcast) => {
    setEditingPodcastId(podcast._id); // Marker podcast som redigerbar
    setEditingPodcastData({ ...podcast }); // Load data til form
  };

  // Cancel redigering
  const cancelEditingPodcast = () => {
    setEditingPodcastId(null);
    setEditingPodcastData({});
  };

  // Gem redigering
  const saveEditingPodcast = async () => {
    try {
      await axios.put(`http://localhost:3001/podcast/edit/${editingPodcastId}`, editingPodcastData);
      alert("Podcast updated successfully!");
      setEditingPodcastId(null);
      setEditingPodcastData({});
      fetchPodcasts(); // Opdater liste
    } catch (err) {
      console.error("Failed to update podcast", err);
      alert("Failed to update podcast");
    }
  };

  // ----------------------
  // Logout
  // ----------------------
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/"); // Redirect til forside
  };

  // ----------------------
  // UI
  // ----------------------
  return (
    <div className="flex h-screen bg-gray-100">
      {/* ----------------------
          Sidebar navigation
          Indeholder links til Podcasts og News
          samt logout-knap
      ---------------------- */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <nav className="flex-1 p-4 space-y-2">
          <a href="#podcasts" className="block py-2 px-4 hover:bg-gray-200">Podcasts</a>
          <a href="#news" className="block py-2 px-4 hover:bg-gray-200">News</a>
        </nav>
        <div className="p-4 border-t">
          {/* Logout knap fjerner login fra localStorage og redirecter */}
          <button
            onClick={handleLogout}
            className="w-full block text-center py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            Log ud
          </button>
        </div>
      </aside>

      {/* ----------------------
          Main content area
          Header + Main sections (Podcasts + Articles)
      ---------------------- */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header med titel */}
        <header className="bg-white shadow-md p-4 flex justify-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>

        <main className="flex-1 p-6 space-y-8 overflow-auto">

          {/* ----------------------
              Podcasts sektion
              Formular + tabel
          ---------------------- */}
          <section id="podcasts">
            <h2 className="text-2xl font-semibold mb-4">Podcasts</h2>

            {/* Add Podcast Form */}
            <div className="mb-4 space-x-2 flex flex-wrap items-center">
              {/* Inputs bindes til state newPodcast */}
              <input type="text" placeholder="Headline" className="border p-2 rounded" 
                     value={newPodcast.headline} 
                     onChange={(e) => setNewPodcast({ ...newPodcast, headline: e.target.value })} />
              <input type="text" placeholder="Info" className="border p-2 rounded" 
                     value={newPodcast.info} 
                     onChange={(e) => setNewPodcast({ ...newPodcast, info: e.target.value })} />
              <input type="number" placeholder="Length (min)" className="border p-2 rounded" 
                     value={newPodcast.length} 
                     onChange={(e) => setNewPodcast({ ...newPodcast, length: e.target.value })} />
              <input type="text" placeholder="Thumbnail filename" className="border p-2 rounded" 
                     value={newPodcast.thumbnail} 
                     onChange={(e) => setNewPodcast({ ...newPodcast, thumbnail: e.target.value })} />
              <input type="text" placeholder="Podcast filename" className="border p-2 rounded" 
                     value={newPodcast.podcast} 
                     onChange={(e) => setNewPodcast({ ...newPodcast, podcast: e.target.value })} />
              <input type="date" placeholder="Release Date" className="border p-2 rounded" 
                     value={newPodcast.releaseDate} 
                     onChange={(e) => setNewPodcast({ ...newPodcast, releaseDate: e.target.value })} />
              <button onClick={handleAddPodcast} className="py-2 px-4 bg-green-500 text-white hover:bg-green-600 rounded">
                Add Podcast
              </button>
            </div>

            {/* Podcasts table */}
            <div className="overflow-auto bg-white shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Headline</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Info</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Length</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {podcasts.map((p) => (
                    <tr key={p._id}>
                      <td className="px-6 py-4">
                        {/* Rediger inline hvis podcastId matcher */}
                        {editingPodcastId === p._id ? (
                          <input className="border p-1 w-full" 
                                 value={editingPodcastData.headline} 
                                 onChange={(e) => setEditingPodcastData({ ...editingPodcastData, headline: e.target.value })} />
                        ) : (
                          p.headline
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingPodcastId === p._id ? (
                          <input className="border p-1 w-full" 
                                 value={editingPodcastData.info} 
                                 onChange={(e) => setEditingPodcastData({ ...editingPodcastData, info: e.target.value })} />
                        ) : (
                          p.info
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingPodcastId === p._id ? (
                          <input className="border p-1 w-full" type="number" 
                                 value={editingPodcastData.length} 
                                 onChange={(e) => setEditingPodcastData({ ...editingPodcastData, length: e.target.value })} />
                        ) : (
                          `${p.length} min`
                        )}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {/* Save / Cancel vs Edit / Remove */}
                        {editingPodcastId === p._id ? (
                          <>
                            <button onClick={saveEditingPodcast} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
                            <button onClick={cancelEditingPodcast} className="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEditingPodcast(p)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDeletePodcast(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ----------------------
              Articles Sektion
              Formular + tabel
          ---------------------- */}
          <section id="news">
            <h2 className="text-2xl font-semibold mb-4">News</h2>

            {/* Add Article Form */}
            <div className="mb-4 space-x-2 flex flex-wrap items-center">
              {/* Inputs bindes til newArticle state */}
              <input type="text" placeholder="Title" className="border p-2 rounded" 
                     value={newArticle.title} 
                     onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} />
              <input type="text" placeholder="Category" className="border p-2 rounded" 
                     value={newArticle.articleCategory} 
                     onChange={(e) => setNewArticle({ ...newArticle, articleCategory: e.target.value })} />
              <select className="border p-2 rounded" value={newArticle.section} 
                      onChange={(e) => setNewArticle({ ...newArticle, section: e.target.value })}>
                <option value="">Select Section</option>
                {sections.map((s) => <option key={s._id} value={s._id}>{s.name || s.title || s._id}</option>)}
              </select>
              <input type="text" placeholder="Author" className="border p-2 rounded" 
                     value={newArticle.author} 
                     onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} />
              <label className="ml-2">
                <input type="checkbox" checked={newArticle.isLandingpage} 
                       onChange={(e) => setNewArticle({ ...newArticle, isLandingpage: e.target.checked })} 
                       className="mr-1" />
                Landingpage
              </label>
              <button onClick={handleAddArticle} className="py-2 px-4 bg-green-500 text-white hover:bg-green-600 rounded">
                Add News
              </button>
            </div>

            {/* Articles table */}
            <div className="overflow-auto bg-white shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">News</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {articles.map((a) => (
                    <tr key={a._id}>
                      <td className="px-6 py-4">{a.title}</td>
                      <td className="px-6 py-4">{a.articleCategory}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteArticle(a._id)} className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Admin;

//* admin side til håndtering af artikler og podcasts.
//* State styrer articles, podcasts, nye entries og redigering.
//* useEffect beskytter siden med login-check og henter initial data.
//* Axios håndterer API-kald for GET, POST, PUT og DELETE.
//* UI viser formularer og tabeller med bindede state inputs.
//* Handlers sikrer korrekt opdatering af UI efter API-ændringer.
