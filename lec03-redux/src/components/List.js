import React, { useState } from 'react'
import { deleteTodo, editTodo } from '../actions'
import { useDispatch } from 'react-redux'

export const List = ({ data }) => {
  const [editTitle, setEditTitle] = useState()
  const [toggle, settoggle] = useState(false)
  const dispatch = useDispatch();
  
  // Delete Handle
  const handleDelete = (id) => {
    console.log("id", id);
    dispatch(deleteTodo(id))
  }

  const handleEdit = (task) => {
    try {
      const payload = {
        title: task,
        id: data.id
      }
      const action = editTodo(payload)
        dispatch(action)
        settoggle(!toggle)
    } catch (error) {
      console.log("Error",error)
    }
  }
  
  return (
    <div>
      <>{data.title}
        <button onClick={() => settoggle(!toggle)}>Edit</button>
        {toggle ?
        <div>
          < input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        <button onClick={()=>handleEdit(editTitle)}>Submit</button>
        </div> : "" }

        <button onClick={() => handleDelete(data.id)}>X</button>
      </>
    </div>
  )
}
