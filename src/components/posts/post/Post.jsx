import styles from './post.module.scss';
import Avatar from '../../avatar/Avatar';
import Buttons from './buttons/Buttons';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({data}) => {

  const navigate = useNavigate();

  const [buttonsData, setButtonsData] = useState({});

  useEffect(() => {
    setButtonsData({
      likes: data.likes,
      comments: data.comments,
      forwards: data.forwards
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.user} onClick={() => navigate(`/user/${data.author._id}`)}>
        <Avatar id={data.author.avatar}/>
        <div className={styles.username}>{data.author.username}</div>
      </div>
      <div className={styles.text}>{data.text}</div>
      <Buttons data={buttonsData} setData={setButtonsData} postId={data._id}/>
    </div>
  )
};

export default Post;