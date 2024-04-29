import styles from './following.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import { Context } from '../../contexts/context';
import User from '../user/User';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Following = () => {

  const [data, setData] = useState([]);

  const { userId } = useParams();

  const { fetchFollowing, following, currentProfile } = useContext(Context);

  let i = 0;

  const checkIsLocal = () => !userId ? true : false;

  useEffect(() => {
    if (userId) {
      fetchFollowing(userId, setData);
    }
    else {
      setData(following);
    }
  }, []);

  return (
    data &&  <>
      <SwipeBack/>
      <div className={styles.container}>
        <div className={styles.title}>{checkIsLocal() 
          ? `People that you follow` 
          : <div>People that <span className={styles.username}>{currentProfile.username}</span> follows</div>}
        </div>
        <div className={styles.following}>
          {data && data.length > 0 && data.map(item => {
            return (
              <div className={styles.user}>
                <User key={i++} user={item}/>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default Following;  