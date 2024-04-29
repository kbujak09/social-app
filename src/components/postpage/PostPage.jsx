import styles from './postpage.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import { Context } from '../../contexts/context';
import Post from '../posts/post/Post';
import Loader from '../loader/Loader';
import CommentsList from './commentslist/CommentsList';
import Creator from '../creator/Creator';
import { CommentContext } from '../../contexts/context';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostPage = () => {

  const { postId } = useParams();
  
  const { posts, userPosts } = useContext(Context);

  const allPosts = posts.concat(userPosts);

  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const [comments, setComments] = useState();

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
  };

  const getComments = async () => {
    const req = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);

    if (req.ok) {
      return setComments(await req.json());
    }

    if (comments.length === 0) {
      return setComments([]);
    }

    return;
  }

  useEffect(() => {
    getCurrentPost();
    getComments();
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
        <Creator 
          placeholder={"Share your thoughts!"}
          submitText={"COMMENT"}
          isComment={true}
          maxLength={70}
          postId={postId}
          setState={setComments}
        />
        <CommentContext.Provider value={{comments, setComments}}>
          <CommentsList />
        </CommentContext.Provider>
      </div>
    </>
  )
}

export default PostPage;