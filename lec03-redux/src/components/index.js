import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, editTodo, deleteAll, deleteTodo } from '../actions'
import { List } from './List'
import { v4 as uuid } from 'uuid'
import Swal from 'sweetalert2';

export const ToDo = () => {
  const [inputData, setInputData] = useState()

  const list = useSelector((val) => {
    return val.todoReducer.todoList
  })

  console.log("list", list)

  const dispatch = useDispatch();
  const handleTodo = (task) => {
    try {
      if (!task) {
        Swal.fire("Field can't be empty")
      } else {
        const payload = {
          title: task,
          id: uuid()
        }
        const action = addTodo(payload)
        dispatch(action)
        console.log("payload", payload)
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  
  const handleDeleteAll = () => {
    try {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue'
        // icon: 'error',
        // confirmButtonText: 'Cool'
      })
        dispatch(deleteAll())
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div>
      <div>Input :
        <input value={inputData} onChange={(e) => {
          setInputData(e.target.value);
          e.preventDefault();
        }}></input>
        <button onClick={() => handleTodo(inputData)}>Submit</button>
      </div>
      {
        list.map((item) => {
          return (
            <List data={item} />
          )
        })
      }
      <button onClick={()=>handleDeleteAll()}>Delete All</button>
    </div>
  )
}
