import axios from 'axios';
import React, { useState } from 'react';

const Signup = ({ onSwitch }: { onSwitch: () => void }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });

  const [confirmpassword, setconfirmpassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (formData.password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      
      const res = await axios.post('http://localhost:3000/api/users/create', formData);
      alert('Account created successfully!');
      onSwitch(); // Switch to login view
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Signup failed");
    }
  };

  return (
    /* 1. Use <form> for accessibility and 'Enter' key support */
    <form onSubmit={handleSignup} className='flex flex-col gap-6 w-80'>
      <div>
        <h2 className='text-3xl font-bold text-amber-500'>Create Account</h2>
        <p className='text-gray-400 text-sm mt-1'>Join the MasterChef family</p>
      </div>
      
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-gray-300 text-sm font-medium'>Username</label>
          <input 
            type="text" 
            onChange={(e) => setformData(prev => ({ ...prev, name: e.target.value }))}
            value={formData.name}
            required
            placeholder='Enter username' 
            className='bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-gray-300 text-sm font-medium'>Email</label>
          <input 
            type="email" 
            onChange={(e) => setformData(prev => ({ ...prev, email: e.target.value }))}
            value={formData.email}
            required
            placeholder='Enter email' 
            className='bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all'
          />
        </div>
        
        <div className='flex flex-col gap-1'>
          <label className='text-gray-300 text-sm font-medium'>Password</label>
          <input 
            type="password" 
            placeholder='Enter password' 
            value={formData.password}
            required
            onChange={(e) => setformData(prev => ({ ...prev, password: e.target.value }))}
            className='bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-gray-300 text-sm font-medium'>Re-Enter Password</label>
          <input 
            type="password" 
            placeholder='Confirm your password' 
            required
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            className='bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all'
          />
        </div>
      </div>
      
      <div className='flex flex-col gap-3'>
        {/* 2. Changed to type="submit" */}
        <button 
          type="submit"
          className='w-full bg-amber-500 text-black font-bold py-3 rounded-lg cursor-pointer hover:bg-amber-600 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20'
        >
          Create Account
        </button>
        
        <div className='text-center text-sm'>
          <span className='text-gray-400'>Already have an account? </span>
          <button 
            type="button" 
            className='text-amber-500 font-semibold cursor-pointer hover:text-amber-400 hover:underline transition-all' 
            onClick={onSwitch}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;