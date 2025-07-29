import { useState } from "react";
import type { BlogType } from "../types/blog.types";
import styles from "../styles/Blog.module.css";
import blogsService from "../services/blogs.service";
import { useNotification } from "../hooks/useNotification";
import axios from "axios";

const Blog = ({blog}: {blog: BlogType}) => {
  const [displayDetails, setDisplayDetails] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const { pushNotification } = useNotification()

  const toggleDisplayDetails = () => {
    setDisplayDetails(!displayDetails)
  }

  const handleLike = async () => {    
    try {
      
      const newLiked = !liked
      const newLikesCount = !liked ? likes + 1 : likes - 1

      // Optimistic updates - update UI immediately
      setLiked(newLiked)
      setLikes(newLikesCount)

      const updatedBlog = await blogsService.update({...blog, likes: newLikesCount})
      setLikes(updatedBlog.likes)

    } catch (error) {
      // Rollback on error
      setLiked(liked)
      setLikes(likes)
      console.error('Failed to update like: ', error)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "An unknown error occurred";
        pushNotification(errorMessage, true)
      }
    }
  }

  if (displayDetails) {
    return (
      <div className={styles.blogExpanded}>
        <div className={styles.blogTitleAuthor}>
          {blog.title} by {blog.author} 
          <button onClick={toggleDisplayDetails}>hide</button>
        </div>
        <div className={styles.blogDetails}>
          <div>URL: <a href={blog.url}>{blog.url}</a></div>
          <div>
            Likes: {likes}
            <button 
              onClick={handleLike} 
              style={{ 
                backgroundColor: liked ? '#dc3545' : '#28a745',
                color: 'white'
              }}
            >
              {liked ? 'Unlike' : 'Like'}
            </button>
          </div>
          <div>Added by: {blog.user?.name}</div>
          <div>
            <button>remove</button>
          </div>
        </div>
      </div> 
    )
  }

  return (
    <div className={styles.blogCollapsed}>
      <span>{blog.title} by {blog.author}</span>
      <button onClick={toggleDisplayDetails}>view</button>
    </div>  
  )
}

export default Blog