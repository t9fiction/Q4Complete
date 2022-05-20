import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    { 
        id: '1', title:'Redux', content:'This is content of Redux'
    },
    { 
        id: '2', title:'Context', content:'This is Cntext API'
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded(state, action){
            state.push(action.payload)
        }
    }
})

export const selectAllPosts = (state)=>state.posts;
export const {postAdded} = postsSlice.actions;
export default postsSlice.reducer;