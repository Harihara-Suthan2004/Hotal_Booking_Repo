import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className=' bg3 flex flex-col gap-12 px-16 py-16'>
      <div className='grid place-content-center gap-6 text-center'>
        <h2 className='text-4xl font-bold'>Need Update on Latest Offers?</h2>
        <p className='texxt-lg text-gray-400'>Subscribe to our newsletter to get frequent updates</p>
        <div className=' flex items-center justify-center max-w-xl mx-auto wifull'>
          <input type="text" placeholder='Enter email address' className='flex-grow px-4 py-3 border-2 border-r-0 border-amber-500 rounded-l-full outline-none text-sm'/>
          <button className='bg-amber-500 text-white px-6 py-3 rounded-r-full font-bold'>Join Now</button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center md:text-left gap-6'>
        <div>
          <h2 className='text-2xl font-bold'>DEEMI'S DINER</h2>
          <div className='flex justify-between md:justify-start gap-4 mt-3 text-orange-500'>
            <FaFacebook className='text-3xl cursor-pointer'/>
            <FaInstagram className='text-3xl cursor-pointer'/>
            <FaYoutube className='text-3xl cursor-pointer'/>
          </div>
        </div>
        <div>
          <ul className='flex gap-6 justify-center text-base font-medium'>
            <li>Home</li>
            <li>Menue</li>
            <li>About Us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <p className='text-center text-sm mt-4'>2025 DEEMI'S DINER. All rights reserved.</p>
    </div> 
  )
}

export default Footer
