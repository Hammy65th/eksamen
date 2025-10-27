import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  // Protect admin page
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) navigate("/login"); // redirect to login if not logged in
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <nav className="flex-1 p-4 space-y-2">
          <a href="#users" className="block py-2 px-4 hover:bg-gray-200">Brugere</a>
          <a href="#products" className="block py-2 px-4 hover:bg-gray-200">Produkter</a>
          <a href="#contacts" className="block py-2 px-4 hover:bg-gray-200">Kontakt</a>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full block text-center py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            Log ud
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="bg-white shadow-md p-4 flex justify-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>

        <main className="flex-1 p-6 space-y-8 overflow-auto">
          {/* Users Section */}
          <section id="users">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="mb-4">
              <button className="py-2 px-4 bg-green-500 text-white hover:bg-green-600">
                Add User
              </button>
            </div>
            <div className="overflow-auto bg-white shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">ee</td>
                    <td className="px-6 py-4">ee</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 bg-red-500 text-white hover:bg-red-600">
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Products Section */}
          <section id="products">
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            <div className="mb-4">
              <button className="py-2 px-4 bg-green-500 text-white hover:bg-green-600">
                Add Product
              </button>
            </div>
            <div className="overflow-auto bg-white shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">dd</td>
                    <td className="px-6 py-4">dd</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 bg-red-500 text-white hover:bg-red-600">
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contacts Section */}
          <section id="contacts">
            <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
            <div className="overflow-auto bg-white shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Message</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">ss</td>
                    <td className="px-6 py-4">ss</td>
                    <td className="px-6 py-4">ss</td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white hover:bg-green-600">
                        Respond
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Admin;
