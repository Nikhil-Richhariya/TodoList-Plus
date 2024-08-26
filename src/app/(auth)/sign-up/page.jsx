'use client'
import SignUpForm from '@/components/SignUpForm'
import React from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";

const page = () => {

    const router = useRouter(); 

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/sign-up', data);
            router.replace(`/verify/${data.username}`);
            console.log(response);
            
        } catch (error) {
            console.log("Error in sing up : " + error); 
        }        
    }

  return (
    <> 
        <SignUpForm onSubmit = {onSubmit}/>
    </>
  )
}

export default page