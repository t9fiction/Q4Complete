import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts } from './postsSlice'

export const PostList = () => {
    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts.map((post)=>(
        <article key={post.id}>
            <h3>{post.title}</h3>
            {/* This substring will show from 0 to 100 */}
            <p>{post.content.substring(0,100)}</p> 
        </article>
    ))


  return (
    <section>
        <h2>Posts Feed</h2>
        <div>{renderedPosts}</div>
    </section>
  )
}