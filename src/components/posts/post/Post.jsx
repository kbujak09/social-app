import styles from './post.module.scss';
import Buttons from './buttons/Buttons';
import User from '../../user/User';

import { useState, useEffect } from 'react';
import { DateTime } from "luxon";
import { useNavigate } from 'react-router-dom';

const Post = ({data, isForward, commentsLength}) => {

  const [buttonsData, setButtonsData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setButtonsData({
      likes: data.likes,
      comments: data.comments,
      forwards: data.forwards
    })
  }, []);

  const date = data.createdAt ? DateTime.fromISO(data.createdAt) : null;

  const navigateToPost = () => {
    navigate(`/post/${data._id}`);
  }

  return (
    data && <div className={styles.container} onClick={isForward ? navigateToPost : null}>
      <div className={styles.header}>
        <User user={data.author} isPost={true}/>
        {date && <div className={styles.date}>
          <div className={styles.minutes}>
            {date.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </div>
          <div className={styles.days}>
            {date.toLocaleString({day: '2-digit', month: '2-digit', year: '2-digit'})}
          </div>
        </div>  }                                  
      </div>
      <div className={styles.text}>{data.text}</div>
      {!isForward && <Buttons post={data} data={buttonsData} setData={setButtonsData} postId={data._id} author={data.author._id} commentsLength={commentsLength}/>}
    </div>
  )
};

export default Post;