"use client"

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter(); 
    const logout = async () => {
        try {
            const response = await axios.post("/api/sign-out");
            // console.log(response);
            router.replace('/'); 
        } catch (error) {
            console.log("Error in Loggin Out : " + error)
        }
        
    }

    return (
        <div className='flex w-screen bg-white h-16 justify-between items-center'>
            <div className='m-5 font-serif font-extrabold' >TodoList+</div>
            <nav className = 'flex w-2/12 m-5 justify-evenly'>
                <Link href={"/"}>Home</Link>
                <button 
                    onClick={() => logout()}
                >Logout</button>
            </nav>
    
        </div>
    )
}

export default NavBar