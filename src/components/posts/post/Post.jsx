import styles from './post.module.scss';
import Avatar from '../../avatar/Avatar';
import Buttons from './buttons/Buttons';
import User from '../../user/User';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";

const Post = ({data}) => {

  const [buttonsData, setButtonsData] = useState({});

  useEffect(() => {
    setButtonsData({
      likes: data.likes,
      comments: data.comments,
      forwards: data.forwards
    })
  }, []);

  const date = DateTime.fromISO(data.createdAt);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <User user={data.author} isPost={true}/>
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
      <Buttons data={buttonsData} setData={setButtonsData} postId={data._id}/>
    </div>
  )
};

export default Post;