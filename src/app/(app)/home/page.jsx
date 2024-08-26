"use client"

import TodoList from '@/components/TodoList';
import ListInput from '@/components/ListInput';
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { resolve } from 'styled-jsx/css';

const Home = () => {

    const router = useRouter(); 
    const [lists, setLists] = useState([]);

    const handleCreateList = async (title) => {
      try {
        const response = await axios.post('/api/createList', {title}); 
        console.log(response); 
      } catch (error) {
          console.log("Error creatin a list : " , error) ; 
      }
    } 

    const fetchLists = async () => {
      try {
        const response = await axios.get('/api/getListForUser');
        const listArray = response.data.lists; 
        const newListArray = listArray.map((list) => ({
            title: list.title,
            id: list._id,
        }));
        
        setLists(newListArray);
      } catch (error) {
        console.log("Error fetching lists: ", error);
      }
    };

    useEffect(() => {

        fetchLists(); 

    }, []);     

  return (
    <div>
        <ListInput handleCreateList = {handleCreateList}/>
        <TodoList listArray = {lists} />

    </div>
  )
}

export default Home