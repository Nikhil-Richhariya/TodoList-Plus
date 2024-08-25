'use client'

import React from 'react'
import { useParams, useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import '../../../globals.css'
import axios from 'axios';
const page = ({ params }) => {

    // const params = useParams();
    const username = params.username;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const onSubmit = (data) => {
        try {
            const { verifyCode } = data;
            const response = axios.post('/api/verifyEmail', { verifyCode, username });
            console.log(response);
            router.replace(`/sign-in`);


        } catch (error) {
            console.log("Error in verifying Email : " + error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className=''>



                <div className="mb-4">
                    <label htmlFor="Verification Code" className="block text-sm font-medium text-gray-700">
                        Verification Code (OTP)
                    </label>
                    <input
                        type="password"
                        id="verifyCode"
                        {...register('verifyCode', {
                            required: 'OTP is required',
                            minLength: {
                                value: 6,
                                message: 'OTP must be at 6 characters long',
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
    )
}

export default page;