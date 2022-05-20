import { useState } from "react";
import React from 'react'
import { useDispatch } from "react-redux";
//nanoid is used to generate auto id so no need to use uuid
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () =>{
        if(title && content){
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )
            setTitle('');
            setContent('');
        }
    }

    const onAuthorChanged =()=>{}

  return (
    <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                {/* <label htmlFor="postAuthor">Author:</label> */}
                {/* <select id="postAuthor" value={userId} onChange={onAuthorChanged}> */}
                {/* <select id="postAuthor" onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select> */}
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    // disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
  )
}
