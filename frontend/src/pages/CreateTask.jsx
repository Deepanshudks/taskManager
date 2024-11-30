import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginAlert from "../components/LoginAlert";

const CreateTask = ({ onTaskCreate = () => {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title cannot be empty")
      return;
    }
    axios.post(`${import.meta.env.VITE_URL}/task`,{title:title,description:description},{
    headers:{
      Authorization : localStorage.getItem("token")
    }}).then(res=>{
      toast.success("Task added");
      navigate("/tasks")
    })
  };

  if(!localStorage.getItem("token")){
    return (
    <LoginAlert/>
    )
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
    </>

  );
};

export default CreateTask;
