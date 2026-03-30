import React from 'react'
import img1 from '../assets/breakfast.jpg'
import img2 from'../assets/serv2.jpg'
import img3 from '../assets/serv3.jpg'
import line from '../assets/line2.png'

const Service = () => {
  return (
    <div>
      <div className='flex bg3'>
        {/* first service */}
        <div className='w-1/3'>
          <div className='p-16'>
            <img src={line} alt=""  className=' -mb-2 w-45 place-self-center'/>
            <h2 className='text-amber-300 text-center text-4xl'>Breakfast</h2>
            <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias consequuntur eos, ipsum ex sunt fuga atque dolore impedit deserunt, dignissimos odit nobis expedita magni et dolorum amet corporis ab.</p>
          </div>
          <div>
            <img src={img1} alt="" className='h-160'/>
          </div>
        </div>
        {/* second service */}
        <div className='w-1/3'>
          <div className=''>
            <img src={img3} alt="" className='h-160 w-full'/>
          </div>
          <div className='p-16'>
            <img src={line} alt=""  className=' -mb-2 w-45 place-self-center'/>
            <h2 className='text-amber-300 text-center text-4xl'>Drinks</h2>
            <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias consequuntur eos, ipsum ex sunt fuga atque dolore impedit deserunt, dignissimos odit nobis expedita magni et dolorum amet corporis ab.</p>
          </div>
          
        </div>
        {/* third service */}
        
          <div className='w-1/3'>
          <div className='p-16'>
            <img src={line} alt="" className=' -mb-2 w-45 place-self-center'/>
            <h2 className='text-amber-300 text-center text-4xl'>Appertizers</h2>
            <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias consequuntur eos, ipsum ex sunt fuga atque dolore impedit deserunt, dignissimos odit nobis expedita magni et dolorum amet corporis ab.</p>
          </div>
          <div>
            <img src={img2} alt="" className='h-160'/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Service
