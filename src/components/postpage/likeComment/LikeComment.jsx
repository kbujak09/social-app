import styles from './likecomment.module.scss';
import like from '../../../assets/like.svg';
import like_fill from '../../../assets/like_fill.svg';
import { likeSwitch } from '../../../utils/utils';
import { CommentContext, Context } from '../../../contexts/context';

import { useContext, useEffect, useState } from 'react';

const LikeComment = ({data, setData, commentId}) => {

  const { comments, setComments } = useContext(CommentContext);

  const { ip, bearer } = useContext(Context);

  const [liked, setLiked] = useState(false);

  const handleLikeSwitch = () => likeSwitch(comments, setComments, data, setData, liked, setLiked, commentId,`${ip}/api/comments/${commentId}?userId=${localStorage.userId}`, bearer);

  useEffect(() => {
    if (data.likes && data.likes.includes(localStorage.userId)) {
      setLiked(true);
    }
  }, [data]);

  return (
    data && <div className={styles.container}>
      {
        liked ? 
        <img className={`${styles.icon} ${styles.liked}`} src={like_fill} alt="like" onClick={handleLikeSwitch}/> :
        <img className={styles.icon} src={like} alt="like" onClick={handleLikeSwitch}/>
      }
      <div className={styles.count}>{data.likes ? data.likes.length : 0}</div>
    </div>
  )
}

export default LikeComment;