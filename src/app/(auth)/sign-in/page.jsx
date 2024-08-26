'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";
import SignInForm from '@/components/SignInForm';

const SignIn = () => {

    const router = useRouter(); 

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/sign-in', data);
            console.log("redirect");
            router.replace(`/home`);
            
            console.log(response);
            
        } catch (error) {
            console.log("Error in sing in : " + error); 
        }        
    }

  return (
    <> 
        <SignInForm onSubmit = {onSubmit}/>
    </>
  )
}

export default SignIn ; 

