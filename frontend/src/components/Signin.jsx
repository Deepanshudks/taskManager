import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/signin`, {
        username,
        password,
      });
      localStorage.setItem("token",response.data.token)
      setLoading(false);
      toast.success("Signin successful")
      navigate("/tasks");
    } catch (err) {
      setLoading(false);
      toast.error("Signin failed")
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Sign In
      </h1>
      <p className="text-center text-gray-500">
        New here?{" "}
        <Link
          to="/signup"
          className="underline text-blue-500 hover:text-blue-700 font-medium"
        >
          Sign Up
        </Link>
      </p>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-100 p-2 mt-4 rounded-md">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleClick} autoComplete="off"
      >
        <input
            type="text" placeholder="Username" aria-label="Username" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" autoComplete="off" onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password" autoComplete="off" placeholder="Password" aria-label="Password" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit" className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"  disabled={loading}
        >
          {loading ? (
            <>
              <Spinner/>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signin;
