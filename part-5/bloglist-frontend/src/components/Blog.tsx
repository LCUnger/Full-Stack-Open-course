import { useState } from "react";
import type { BlogType } from "../types/blog.types";
import styles from "../styles/Blog.module.css";

const Blog = ({blog}: {blog: BlogType}) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const toggleDisplayDetails = () => {
    setDisplayDetails(!displayDetails)
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
            Likes: {blog.likes}
            <button>like</button>
          </div>
          <div>Added by: {blog.user?.name}</div>
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