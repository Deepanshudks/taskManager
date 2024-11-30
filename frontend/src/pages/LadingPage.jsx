import React from 'react'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Hero from '../components/Hero'
import HomeNav from '../components/HomeNav'

const LadingPage = ({page}) => {
  return (
    <>
    <HomeNav/>
    <div className='w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
        <div className='bg-blue-50 hidden md:block'>
            <Hero/>
            </div>
        <div className='flex justify-center items-center'>
            {
              page == "signup"?<Signup/>:<Signin/>
            }
            
        </div>
    </div>
    </>
  )
}

export default LadingPage