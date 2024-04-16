import styles from './profileposts.module.scss';
import Post from '../../posts/post/Post';

import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const ProfilePosts = ({userId}) => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      let res = await fetch(`http://localhost:5000/api/posts/${userId}`);
      const json = await res.json();
      setPosts(json);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  let key = 0;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <ReactLoading width='48px' type='spin'/>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {posts.length > 0 && posts.reverse().map(post => {
      return <Post data={post} key={key++}/>})
      }
    </div>
  )
};

export default ProfilePosts;