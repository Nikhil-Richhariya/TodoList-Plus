"use client"
import React, { useEffect, useState } from 'react'

const TodoListCard = ({id,children}) => {
    
    const [_id, set_Id] = useState(""); 

    useEffect(() => {
        
        set_Id(id); 
    
    }, [])
    
  
    return (

    {children}
  )
}

export default TodoListCard