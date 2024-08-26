'use client'
import React, { useState } from 'react'
import '../app/globals.css';

const ListInput = ({ handleCreateList }) => {
    const [title, setTitle] = useState("")
    return (
        <div className='flex bg-slate-50 justify-between items-center'>
            <input type="text" placeholder='Enter Title'
                onChange={(e) => setTitle(e.target.value)}
                className='w-7/10'
            />
            <button
                onChange={() => { handleCreateList(title); setTitle("") }}
                className='w-8/10'
            >Add</button>
        </div>
    )
}

export default ListInput