import React, { useState } from 'react'
import { Link, userNavigate } from "react-router-dom"

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = userNavigate();
  const handlerChange = (e) => {  
      setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false){
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch(error){
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handlerSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handlerChange}/>
        <input type="email" placeholder='E-mail' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handlerChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handlerChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account</p>
        <Link to="/sign-up">
          <span className='text-blue-500'>Sign In</span>
        </Link>
        
      </div>
      <div>
        <p className='text-red-700 mt-5 '>{error && 'Something went wrong!'}</p>
      </div>
    </div>
  )
}
