import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const FilterTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [flag, setflag] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All'); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/task`,{
          headers:{
            Authorization : localStorage.getItem("token")
          }
        })
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks); 
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchTasks();
  }, [flag]);



  const handleFilterChange = async (status) => {
    setStatusFilter(status);

    if (status === 'All') {
      setFilteredTasks(tasks); 
    } else {
      const filtered = tasks.filter((task) => {
        if (status === 'Pending') {
          return !task.completed; 
        } else if (status === 'Completed') {
          return task.completed; 
        }
        return true;
      });
      setFilteredTasks(filtered); 
    }
  };


  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => handleFilterChange('All')}
          className={`px-4 py-2 ${statusFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('Pending')}
          className={`px-4 py-2 ${statusFilter === 'Pending' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Pending
        </button>
        <button
          onClick={() => handleFilterChange('Completed')}
          className={`px-4 py-2 ${statusFilter === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Completed
        </button>
      </div>

      <div className='w-screen h-fit z-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
      {filteredTasks.length === 0 ? (
          <p>No tasks found for this filter.</p>
        ) : (
          
          filteredTasks.map((e) => (
            <TaskCard setflag={setflag} id={e._id} key={e._id} title={e.title} description={e.description} createdAt={e.createdAt} status={e.completed} />
          ))
        )}
      </div>
    </div>
  );
};

export default FilterTasks;
