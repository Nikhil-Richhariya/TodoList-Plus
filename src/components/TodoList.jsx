'use client'

import React from 'react'
import TodoListCard from './TodoListCard'

const TodoList = ({ listArray }) => {
  return (
    <ul>
      {
        listArray.map((list,idx) => {
          return (
            <TodoListCard id = {list.id}>
              <p>{list.title}</p>
            </TodoListCard>
          )
        })
      }
    </ul>
  )
}

export default TodoList