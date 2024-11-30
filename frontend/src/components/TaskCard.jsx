import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModel";
import toast from "react-hot-toast";

const TaskCard = ({
  title,
  id,
  setflag,
  description,
  createdAt,
  status,
}) => {
  const [isCompleted, setIsCompleted] = useState(status);
  const [visible,setVisible]
 = useState(false)
  const navigate = useNavigate()
  
  const onEdit = () => {
    navigate(`/edit/${id}`)
  }
  const onDelete = () => {
      // navigate(`/delete/${id}`)
      setVisible(true)
      setflag((prev)=>!prev)
  }
  useEffect(()=>{
      axios.put(`http://localhost:3000/completed/${id}`,{
        completed : isCompleted
      },{
        headers:{
          Authorization : localStorage.getItem("token")
        }
      }).then(res=>{
      })
    },[isCompleted])
  
  
  const toggleCompletion = () => {
    setIsCompleted((prev) => !prev);
    setflag((prev)=>!prev)
  };
  
  return (
    <>
      <ConfirmationModal setVisible={setVisible} visible={visible} id={id}/>
    <div className="max-w-lg  mx-auto h-fit p-4">
      <div
        className={`border p-6 rounded-lg shadow-md transition ${
          isCompleted ? "bg-green-100 border-green-400" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-semibold ${
              isCompleted ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {title}
          </h2>
          <div
            onClick={toggleCompletion}
            className={`relative items-center inline-flex h-6 w-12 rounded-full cursor-pointer transition ${
              isCompleted ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute h-5 w-5 bg-white rounded-full shadow transform transition ${
                isCompleted ? "translate-x-6" : "translate-x-1"
              }`}
            ></span>
          </div>
        </div>

        <p
          className={`mb-4 ${
            isCompleted ? "line-through text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Created At: {createdAt}</span>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-4 py-1 text-sm text-slate-600 border  rounded-lg hover:bg-blue-100 transition"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-1 text-sm text-slate-600 border  rounded-lg hover:bg-red-100 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default TaskCard;
