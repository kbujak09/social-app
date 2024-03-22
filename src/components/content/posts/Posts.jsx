import styles from './posts.module.scss';
import Post from './post/Post';

import { useState, useEffect } from 'react';

const Posts = () => {

  const [posts, setPosts] = useState([]);

  let key = 0;

  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts?userId=${localStorage.userId}`);

      const data = await res.json();
      
      setPosts(data);
    }
    catch (err) {
      console.error('Fetching posts failed');
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      { posts.reverse().map(post => {
      return <Post data={post} key={key++}/>})
      }
    </div>
  )
};

export default Posts;