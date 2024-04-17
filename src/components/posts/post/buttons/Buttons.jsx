import styles from './buttons.module.scss';
import like from '../../../../assets/like.svg';
import like_fill from '../../../../assets/like_fill.svg';
import comment from '../../../../assets/comment.svg';
import forward from '../../../../assets/forward.svg';
import { Context } from '../../../../contexts/context';

import { useContext, useEffect, useState } from 'react';

const Buttons = ({data, setData, postId}) => {

  const { setPosts, posts } = useContext(Context);

  const [liked, setLiked] = useState();

  const likeSwitch = async () => {
    try {
      let updatedLikes; 

      if (data.likes) {
        updatedLikes = [...data.likes];
      }
      else {
        updatedLikes = [];
      }

      if (!liked) {
        updatedLikes.push(localStorage.userId);
        setLiked(true);
      }
      else {
        const index = updatedLikes.indexOf(localStorage.userId);
        if (index !== -1) {
          updatedLikes.splice(index, 1);
        }
      }

      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            likes: updatedLikes
          }
        }
        return post;
      });

      setPosts(updatedPosts);

      setData(prevData => ({
        ...prevData, likes: updatedLikes
      }));

      setLiked(!liked);

      await fetch(`http://localhost:5000/api/posts/${postId}/likes?userId=${localStorage.userId}`, {
        method: 'POST'
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

  return (
    data && <div className={styles.container}>
    <div className={styles.button}>
      {liked ? 
        <img className={`${styles.icon} ${styles.liked}`} src={like_fill} alt="like" onClick={likeSwitch}/> :
        <img className={styles.icon} src={like} alt="like" onClick={likeSwitch}/>
      }
      <div className={`${styles.count} ${liked ? styles.likedCount : null}`}>{data.likes ? data.likes.length : 0}</div>
    </div>
    <div className={styles.button}>
      <img className={styles.icon} src={comment} alt="comment" />
      <div className={styles.count}>{data.comments ? data.comments.length : 0}</div>
    </div>
    <div className={styles.button}>
      <img className={styles.icon} src={forward} alt="forward" />
      <div className={styles.count}>{data.forwards ? data.forwards.length : 0}</div>
    </div>
  </div>
  );
}

export default Buttons;