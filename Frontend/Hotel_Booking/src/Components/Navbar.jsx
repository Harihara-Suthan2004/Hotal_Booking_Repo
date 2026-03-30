import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-8 text-white'>
      <div>
        <h2 className='font-bold text-2xl'>Demi's Diner</h2>
      </div>
      <div>
        <ul className='flex justify-between gap-8'>
          <li className='font-bold text-lg cursor-pointer'>Home</li>
          <li className='font-bold text-lg cursor-pointer'>Reservation</li>
          <li className='font-bold text-lg cursor-pointer'>Menue</li>
          <li className='font-bold text-lg cursor-pointer'>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
