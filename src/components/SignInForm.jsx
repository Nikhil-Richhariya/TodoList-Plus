'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import '../app/globals.css';

export default function SignInForm({onSubmit}) {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Destructure errors from formState
  } = useForm();
  
  const onSubmitHandler = (data) => {
    onSubmit(data); 
  }
    

  return (
    <div className=" bg-cyan-400 flex flex-col justify-center items-center w-screen h-screen border-red-200">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)} className=''>

        
 
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Please enter a valid email',
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="password-error"
          />
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
