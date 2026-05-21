import axios from 'axios';
import React, { useState } from 'react'

const Login = ({ onSwitch,onSuccess }: { onSwitch: () => void, onSuccess:(token:string,role:string)=>void }) => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:3000/api/users/login',{email,password});
            const {token,user}=res.data
            onSuccess(token,user.role);
        }
        catch(err:any){
            alert(err.response?.data?.message || 'login failed')
        }
    };
    return (
        <div className='flex flex-col gap-6 w-80'>
            <div>
                <span className='text-3xl font-bold text-amber-500'>Login</span>
                <p className='text-gray-400 text-sm mt-1'>Welcome back, Chef!</p>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label className='text-gray-300 text-sm'>Email</label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} required className='bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-amber-500 outline-none' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-gray-300 text-sm'>Password</label>
                    <input type="password" onChange={(e)=>setpassword(e.target.value)} required className='bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-amber-500 outline-none' />
                </div>
            </div>

            <div>
                <button 
                type='submit'
                onClick={handleSubmit}
                className='w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors'>
                    Submit
                </button>
                <div className='mt-3 text-center'>
                    <span className='text-gray-400'>New here? </span>
                    <button
                        onClick={onSwitch} // This switches to Signup
                        className='text-amber-500 font-semibold cursor-pointer hover:underline'
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
