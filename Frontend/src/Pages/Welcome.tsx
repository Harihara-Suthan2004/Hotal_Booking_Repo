import React, { useState } from 'react'
import cooking from '../assets/Images/cooking.jpg'
import { useFood, type FoodItem } from "../Context/FoodContext"
import Footer from '../Components/Footer';
import rice from '../assets/Images/rice2.png'
import pasta from '../assets/Images/pasta1.png'
import chicken from '../assets/Images/chicken.png'
import chicken2 from '../assets/Images/chiken2.png'
import Signup from '../Components/Signup';
import { FaTimes } from 'react-icons/fa';
import Login from '../Components/Login';

const Welcome = ({ onAuthSuccess }: { onAuthSuccess: (token: string, role: string) => void }) => {
  const { foodData, loading, error } = useFood();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setauthMode] = useState<'login' | 'signup'>('signup');

  if (loading) {
    return <div className="h-screen bg-slate-900 flex items-center justify-center text-amber-500">Loading MasterChef...</div>;
  }

  if (error) {
    return <div className="h-screen bg-slate-900 flex items-center justify-center text-red-500 text-center px-4">
      <p>Error connecting to backend: {error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 text-amber-500 underline">Try Again</button>
    </div>;
  }

  return (
    // 1. Changed h-screen to min-h-screen to allow scrolling
    <div className='relative w-full min-h-screen px-6 bg-slate-900 text-white'>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-amber-500 transition-colors"
            >
              <FaTimes size={24} />
            </button>

            {authMode === 'signup' ? (
              <Signup onSwitch={() => setauthMode('login')} />
            ) : (
              <Login onSwitch={() => setauthMode('signup')} onSuccess={onAuthSuccess} />
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-10 pt-10 pb-20'>
        <div className='w-full md:w-1/2 flex flex-col gap-6 items-center justify-center text-center'>
          <h1 className="font-['Playfair_Display'] text-6xl font-bold tracking-tight text-amber-500">
            Master<span className="italic text-amber-700">Chef</span>
          </h1>

          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl max-w-lg">
            <h2 className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
              Experience <span className="text-amber-500 font-bold">culinary artistry</span> where world-class master chefs
              transform fresh, premium ingredients into
              <span className="italic font-bold block mt-2 text-white">unforgettable gourmet masterpieces.</span>
            </h2>
          </div>

          <div className="flex rounded-full bg-slate-800/50 p-1 border border-amber-500/20 shadow-lg">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Join Now
            </button>
            <button className="bg-transparent text-gray-400 font-medium py-3 px-8 rounded-r-full hover:text-white transition-colors">
              View Menu
            </button>
          </div>
        </div>

        <div className='relative aspect-square w-full md:w-1/2 max-w-md bg-cover h-96 rounded-2xl bg-center bg-no-repeat shadow-2xl'
          style={{ backgroundImage: `url(${cooking})` }}>
          <div className='rounded-full flex flex-col items-center justify-center absolute -left-6 -top-6 h-32 w-32 border-2 border-dashed border-amber-500 bg-slate-900/80 backdrop-blur-md shadow-xl animate-none duration-[3000ms]'>
            <span className='text-3xl font-bold text-white'>20%</span>
            <span className='text-amber-500 font-bold text-xs uppercase tracking-widest'>Discount🤤</span>
          </div>
        </div>
      </div>

      {/* Our Dishes */}
      <div className='max-w-6xl mx-auto'>
        <div className='w-full flex items-center justify-between mb-12 px-4'>
          <h1 className='font-serif text-4xl font-light tracking-tight text-white'>
            Our <span className='font-bold text-amber-500'>Dishes</span>
          </h1>
          <div className='flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent ml-8'></div>
        </div>

        <div className='grid grid-cols-1 gap-6 mb-20'>
          {foodData?.slice(0, 5).map((food: FoodItem) => (
            <div
              key={food.id}
              className='flex flex-col md:flex-row items-center bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group'
            >
              <div className='flex-1 space-y-3 text-center md:text-left'>
                <div className='flex flex-col md:flex-row md:items-center gap-3'>
                  <span className='text-2xl font-bold text-amber-500'>{food.name}</span>
                  <span className='hidden md:block w-2 h-2 rounded-full bg-amber-800'></span>
                  <span className='text-amber-500/80 font-mono font-bold'>${food.price}</span>
                </div>
                <p className='text-gray-400 leading-relaxed max-w-xl'>
                  {food.description} - Handcrafted with passion using our secret MasterChef techniques.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='text-xs font-bold uppercase tracking-widest text-amber-500 border-b border-amber-500/0 hover:border-amber-500 transition-all'
                >
                  Order This Dish →
                </button>
              </div>

              <div className='mt-6 md:mt-0 md:ml-10'>
                <img
                  // If the image path from DB is just a filename, prepend the backend URL
                  src={food.image?.startsWith('http') ? food.image : `http://localhost:3000${food.image}`}
                  alt={food.name}
                  className='w-40 h-40 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500'
                  onError={(e) => {
                    // Fallback if the image still fails to load
                    e.currentTarget.src = "https://via.placeholder.com/150?text=MasterChef+Dish";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='w-full flex items-center justify-between m-3 px-14 group mb-6'>
          <h1 className='font-serif text-4xl font-light tracking-tight text-amber-800'>
            Customer <span className='font-bold text-amber-500'>Reviews</span>
          </h1>
          <div className='flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent ml-8'></div>
        </div>

        <div className=' flex items-center justify-center  gap-20 mb-8'>
          <div className='bg-white/10 rounded-md shadow-md shadow-white p-2'>
            <div className='flex gap-3'>
              <div className='bg-amber-800 w-7 h-7 rounded-full text-center'><span className='text-amber-500'>R</span></div>
              <span className='border-b-2 text-amber-500'>Rahul</span>
            </div>
            <div className='ml-5 text-amber-600'>
              <span className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem temporibus eligendi itaque dolor rem</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src={rice} alt="" className='w-24  h-24' />
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </div>
          <div className='bg-white/10 rounded-md shadow-md shadow-white p-2'>
            <div className='flex gap-3'>
              <div className='bg-amber-800 w-7 h-7 rounded-full text-center'><span className='text-amber-500'>D</span></div>
              <span className='border-b-2 text-amber-500'>Danny</span>
            </div>
            <div className='ml-5 text-amber-600'>
              <span className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem temporibus eligendi itaque dolor rem</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src={pasta} alt="" className='w-24  h-24' />
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </div>
          <div className='bg-white/10 rounded-md shadow-md shadow-white p-2'>
            <div className='flex gap-3'>
              <div className='bg-amber-800 w-7 h-7 rounded-full text-center'><span className='text-amber-500'>S</span></div>
              <span className='border-b-2 text-amber-500'>Sam</span>
            </div>
            <div className='ml-5 text-amber-600'>
              <span className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem temporibus eligendi itaque dolor rem</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src={chicken} alt="" className='w-24  h-24' />
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </div>
          <div className='bg-white/10 rounded-md shadow-md shadow-white p-2'>
            <div className='flex gap-3'>
              <div className='bg-amber-800 w-7 h-7 rounded-full text-center'><span className='text-amber-500'>P</span></div>
              <span className='border-b-2 text-amber-500'>Petar</span>
            </div>
            <div className='ml-5 text-amber-600'>
              <span className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem temporibus eligendi itaque dolor rem</span>
            </div>
            <div className='flex flex-col items-center'>
              <img src={chicken2} alt="" className='w-24  h-24 object-cover' />
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Welcome