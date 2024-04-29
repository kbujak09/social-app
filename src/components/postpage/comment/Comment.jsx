import styles from './comment.module.scss';
import User from '../../user/User';
import LikeComment from '../likeComment/LikeComment';

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const Comment = ({data, setComments}) => {

  const [likes, setLikes] = useState({});

  const date = DateTime.fromISO(data.createdAt);

  useEffect(() => {
    setLikes({
      likes: data.likes
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <User isComment={true} isPost={true} user={data.author}/>
        <div className={styles.date}>
          <div className={styles.minutes}>
            {date.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </div>
          <div className={styles.days}>
            {date.toLocaleString({day: '2-digit', month: '2-digit', year: '2-digit'})}
          </div>
        </div>
      </div>
      <div className={styles.text}>{data.text}</div>
      <LikeComment data={likes} setData={setLikes} commentId={data._id}/>
    </div>
  )
}

export default Comment;