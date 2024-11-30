import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import LoginAlert from './LoginAlert';

const EditTask = () => {
  const [loading,setloading] = useState(false)
  const [taskDetails, setTaskDetails] = useState({
    title:'',
    description:'',
  });

  const {id} = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true)
    try{
      axios.put(`${import.meta.env.VITE_URL}/task/${id}`,taskDetails,{
        headers:{
          Authorization : localStorage.getItem("token")
        }
      }).then(res=>{
        setloading(false)
        toast.success("Task edited");
        navigate("/tasks")
      })
      }catch(e){
        setloading(false)
        toast.error("Failed to edit this task")
      }
  };

  if(!localStorage.getItem("token")){
    return (
    <LoginAlert/>
    )
  }

  return (
    <div className="w-full mt-10 max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <div className='flex justify-between'>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Task</h2>
        <Link className='cursor-pointer' to={"/tasks"}><h2>Cancel</h2></Link>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter task description"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {
            loading?<Spinner/>:"Update Task"
          }
        </button>
      </form>
    </div>
  );
};

export default EditTask;
