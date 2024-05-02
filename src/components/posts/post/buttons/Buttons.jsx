import styles from './buttons.module.scss';
import like from '../../../../assets/like.svg';
import like_fill from '../../../../assets/like_fill.svg';
import comment from '../../../../assets/comment.svg';
import forward from '../../../../assets/forward.svg';
import { Context } from '../../../../contexts/context';
import { likeSwitch } from '../../../../utils/utils';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Buttons = ({data, setData, postId, author, post, isForward}) => {

  const { setPosts, posts, bearer, ip } = useContext(Context);

  const [liked, setLiked] = useState();

  const [isForwarded, setIsForwarded] = useState();

  const navigate = useNavigate();

  const location = useLocation();

  const isNotNavigated = (pathname) => {
    if (location.pathname !== pathname) {
      return navigate(pathname);
    }
  };
  
  const navigateToComments = () => {
    isNotNavigated(`/post/${postId}`);
  }

  const handleLikeSwitch = () => likeSwitch(posts, setPosts, data, setData, liked, setLiked, postId, `http://${ip}/api/posts/${postId}/likes?userId=${localStorage.userId}`);

  const handleForwardSwitch = async () => {
    try {

      let updatedForwards = data.forwards ? [...data.forwards] : [];

      let updatedPosts = posts;

      const userId = localStorage.userId;

      if (!data.forwards.some(forward => forward.author === userId)) {
        updatedForwards = [...data.forwards, { author: userId, post: postId }];
        setIsForwarded(true);
      } else {
        updatedForwards = data.forwards.filter(forward => forward.author !== userId);
        setIsForwarded(false);
      }

      updatedPosts.forEach(post => {
        if (post._id === postId) {
          post.forwards = updatedForwards;
        } 
      });

      setPosts(updatedPosts);

      setData((prevData) => ({
        ...prevData,
        forwards: updatedForwards
      }));

      await fetch(`http://${ip}/api/posts/${postId}/forward?userId=${localStorage.userId}`, {
        method: 'POST',
          headers: {
            Authorization: bearer,
          }
        });
    }
    catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (data.likes && data.likes.includes(localStorage.userId)) {
      setLiked(true);
    }
  }, [data.likes]);

  useEffect(() => {
    if (data.forwards && data.forwards.some(forward => forward.author === localStorage.userId)) {
      setIsForwarded(true);
    }
  }, [data.forwards]);

  return (
    data && <div className={styles.container}>
    <div className={styles.button}>
      {liked ? 
        <img className={`${styles.icon} ${styles.liked}`} src={like_fill} alt="like" onClick={handleLikeSwitch}/> :
        <img className={styles.icon} src={like} alt="like" onClick={handleLikeSwitch}/>
      }
      <div className={`${styles.count} ${liked ? styles.likedCount : null}`}>{data.likes ? data.likes.length : 0}</div>
    </div>
    <div onClick={navigateToComments} className={styles.button}>
      <img className={styles.icon} src={comment} alt="comment" />
      <div className={styles.count}>{data.comments ? data.comments.length : 0}</div>
    </div>
    <div className={styles.button} onClick={handleForwardSwitch}>
      <img className={isForwarded ? `${styles.icon} ${styles.forwarded}` : `${styles.icon}`} src={forward} alt="forward"/>
      <div className={isForwarded ? `${styles.count} ${styles.forwarded}` : `${styles.count}`}>{data.forwards ? data.forwards.length : 0}</div>
    </div>
  </div>
  );
}

export default Buttons;