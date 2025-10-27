import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.message === "Login successful") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userName", email);
        navigate("/admin"); // redirect on success
      } else {
        // Translate backend errors to Danish
        setError(
          data.error === "Invalid credentials"
            ? "Forkert email eller kodeord"
            : data.error || "Noget gik galt"
        );
      }
    } catch (err) {
      console.error(err);
      setError("Fejl under login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Top-left home button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 px-3 py-1 hover:bg-gray-400 rounded"
      >
        Tilbage
      </button>

      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Kodeord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Log ind
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
