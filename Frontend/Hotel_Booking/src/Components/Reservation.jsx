import React, { useState } from 'react'
import {FaFacebook, FaInstagram, FaReddit, FaTwitter, FaYoutube} from 'react-icons/fa';

const Reservation = () => {
  const [formdata,setformdata]=useState({
    name:"",
    email:"",
    phone:"",
    date:"",
    time:"",
    guest:"1"
  })

  const handleChange=(e)=>{
    setformdata({...formdata, [e.target.name] : e.target.value})
  }

  const timeslot=()=>{
    const slots=[];
    for(let hour=9;hour<21;hour++){
      const startHour=hour % 12 === 0 ? 12 : hour % 12;
      const startPeriods=hour < 12 ? "AM" : "PM"

      const endHour=(hour+1)%12 === 0 ? 12 : (hour+1);
      const endPeriods=hour+1 <12 ? "AM" : "PM"

      slots.push(`${startHour}:00 ${startPeriods} - ${endHour}:00 ${endPeriods}`)
    }
    return slots;
  }
  return (
    <div className='min-h-screen bg p-6 md:p-12'>
      <div className='mx-w-6xl mx-auto grid md:grid-cols-3'>
        <form action="" className='md:col-span-2 bg2 p-8 shadow-md'>
          <h2 className='text-xl font-semibold text-amber-500 bg2 uppercase tracking-wider'>Online Reservation</h2>
          <h1 className='text-3xl font-bold mb-4'>Dine with Us- <span className='text-amber-500'>Reserve Now</span></h1>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid gap-1.5 '>
              <label htmlFor="" className='font-bold'>Full Name</label>
              <input type="text" name='name' value={formdata.name} onChange={handleChange} placeholder='Full Name' required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'/>
            </div>

            <div className='grid gap-1.5 '>
              <label htmlFor="" className='font-bold'>Email *</label>
              <input type="text" name='email' value={formdata.email} onChange={handleChange} placeholder='Email' required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'/>
            </div>

            <div className='grid gap-1.5 '>
              <label htmlFor="" className='font-bold'>Phone Number *</label>
              <input type="number" name='phone' value={formdata.phone} onChange={handleChange} placeholder='pheone number' required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'/>
            </div>

            <div className='grid gap-1.5 '>
              <label htmlFor="" className='font-bold'>Reservation Date</label>
              <input type="date" name='date' value={formdata.date} onChange={handleChange}  required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'/>
            </div>

            <div className='grid gap-1.5 '>
              <label htmlFor="" className='font-bold'>Time of Reservation</label>
              <select name="time" value={formdata.time} onChange={handleChange} id="" className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'>
                <option value="">Select Time</option>
                {
                  timeslot().map((slot,index)=>(
                   <option kay={index} value={slot}>{slot}</option>
                  ))
                }
              </select>
            </div>

            <div className='grid gap-1.5 '>
              <label htmlFor="" className='font-bold'>Number of Guest</label>
              <select name="guest" value={formdata.guest} onChange={handleChange} id="" className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'>
                {[...Array(10).keys()].map((i)=>(
                  <option key={i+1} value={i+1}>{i+1} Guest(s)</option>
                ))}
              </select>
            </div>
          </div>
          <button type='submit' className='w-full mt-4 bg-amber-500 text-white hover:bg-amber-600 transition font-bold'>Book A Table</button>
        </form>
        
        <div className='bg3 text-gray-300 p-8 shadow-md space-y-10 text-center'>
          <div>
            <h3 className='text-3xl font-bold'>Address</h3>
            <p className=''>123,abc street,n-axis, Sample City,State,Country</p>
          </div>
          <div>
            <p>Call Us</p>
            <h3 className='text-3xl font-bold'>+919696969696</h3>
          </div>
          <div>
            <h3 className='text-3xl font-bold'>Open Time</h3>
            <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 09:00 AM - 11:00 PM</p>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-2'>Stay Connected</h3>
            <div className='flex gap-4 justify-center'>
              <FaFacebook className='text-4xl text-white'/>
              <FaTwitter className='text-4xl text-white'/>
              <FaInstagram className='text-4xl text-white'/>
              <FaReddit className='text-4xl text-white'/>
              <FaYoutube className='text-4xl text-white'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation
