import styles from './postpage.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import { Context } from '../../contexts/context';
import Post from '../posts/post/Post';
import Loader from '../loader/Loader';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostPage = () => {

  const { postId } = useParams();
  
  const { posts, userPosts } = useContext(Context);

  const allPosts = posts.concat(userPosts);

  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const getCurrentPost = () => {
    for (let post of allPosts) {
      if (post._id === postId) {
        setPost(post);
        return setIsLoading(false);
      }
    }
    setIsLoading(false);
    return navigate(-1);
  }

  useEffect(() => {
    getCurrentPost();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <SwipeBack />
      <div className={styles.container}>
        <Post data={post}/>
      </div>
    </>
  )
}

export default PostPage;