import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/signup", { username, password }).then(res=>{
        localStorage.setItem("token", res.data.token);
        setLoading(false);
      toast.success("Signup successful")
      navigate("/tasks");
      })
    } catch (err) {
      setLoading(false);
      toast.error("Signup failed")
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Sign Up
      </h1>
      <p className="text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="underline text-blue-500 hover:text-blue-700 font-medium"
        >
          Log In
        </Link>
      </p>

      {error && (
        <div className="text-sm text-red-600 bg-red-100 p-2 mt-4 rounded-md">
          {error}
        </div>
      )}

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleClick} autoComplete="off"
      >
        <input type="text" autoComplete="off" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input type="password" autoComplete="off"placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button type="submit" className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400" disabled={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};


export default Signup;
