import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // State til inputfelter og error-meddelelser
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [error, setError] = useState(""); // Fejlbesked hvis login mislykkes

  // useNavigate fra react-router-dom til at navigere efter login
  const navigate = useNavigate();

  // Funktion til at håndtere form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Forhindrer siden i at reloade ved submit
    setError(""); // Nulstil error ved nyt forsøg

    try {
      // POST request til backend login endpoint
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email + password
      });

      const data = await res.json(); // Parse JSON response
      console.log("Login response:", data);

      // Tjek om login lykkedes
      if (data.message === "Login successful") {
        // Gem login info i localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userName", email);

        // Naviger til admin-side
        navigate("/admin"); 
      } else {
        // Håndter fejl fra backend
        setError(
          data.error === "Invalid credentials"
            ? "Forkert email eller kodeord" // Backend returnerer fejl
            : data.error || "Noget gik galt" // Fallback hvis anden fejl
        );
      }
    } catch (err) {
      // Hvis fetch fejler (f.eks. netværksfejl)
      console.error(err);
      setError("Fejl under login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      
      {/* Tilbage-knap til forsiden */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 px-3 py-1 hover:bg-gray-400 rounded"
      >
        Tilbage
      </button>


      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Opdater state ved input
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Kodeord"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Opdater state ved input
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Log ind
        </button>

        {/* Vis fejlmeddelelse hvis login mislykkes */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

//* Kommentarer:
//* 1. useState bruges til email, password og error.
//* 2. useNavigate bruges til at navigere efter succesfuldt login.
//* 3. handleSubmit: async funktion som sender POST request til backend.
//* 4. LocalStorage gemmer login status og brugernavn for session persistence.
//* 5. Error state bruges til at vise fejlbeskeder i UI.
//* 6. e.preventDefault forhindrer reload af siden ved submit.
//* 7. Backend fejl håndteres med forskellige meddelelser (Invalid credentials vs fallback).
//* 8. Tilbage-knap bruger navigate("/") til at gå tilbage til forsiden.
//* 9. Form inputs binder value + onChange til state for controlled components.
