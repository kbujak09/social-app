import styles from './post.module.scss';
import Avatar from '../../../avatar/Avatar';
import Buttons from './buttons/Buttons';

import { useState, useEffect } from 'react';

const Post = ({data}) => {

  const [buttonsData, setButtonsData] = useState({});

  useEffect(() => {
    setButtonsData({
      likes: data.likes.length,
      comments: data.comments.length,
      forwards: data.forwards.length
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar id={data.author.avatar}/>
        <div className={styles.username}>{data.author.username}</div>
      </div>
      <div className={styles.text}>{data.text}</div>
      <Buttons data={buttonsData}/>
    </div>
  )
};

export default Post;