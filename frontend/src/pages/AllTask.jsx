import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import axios from 'axios'
import FilterTasks from '../components/FilterTasks'

const AllTask = () => {
  if(!localStorage.getItem("token")){
    return (
    <div className='h-screen w-screen mt-4 text-center mx-auto'>
      <span className='bg-red-500 text-slate-700 font-bold p-3 rounded '>!Login required</span>
    </div>
    )
  }
  return (
    <>
    <Navbar/>
    <div className='my-2 w-screen text-center'>
      <FilterTasks/>
    </div>
  
    </>
  )
}

export default AllTask