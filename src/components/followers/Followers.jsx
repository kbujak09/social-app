import styles from './followers.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import { Context } from '../../contexts/context';
import User from '../user/User';

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Followers = () => {

  const [data, setData] = useState([]);

  const { userId } = useParams();

  const { followers, fetchFollowers, currentProfile } = useContext(Context);

  let i = 0;

  const checkIsLocal = () => !userId ? true : false;

  useEffect(() => {
    if (userId) {
      fetchFollowers(userId, setData);
    }
    else {
      setData(followers);
    }
  }, []);

  return (
    <>
      <SwipeBack/>
      <div className={styles.container}>
        <div className={styles.title}>{checkIsLocal() 
          ? 'Your followers' 
          : <div><span className={styles.username}>{currentProfile.username}</span> followers</div>}
        </div>
        <div className={styles.followers}>
          {data && data.length > 0 && data.map(user => {
            return (
              <div className={styles.user}>
                <User key={i++} user={user} isLocal={checkIsLocal()} isDelete={true} data={data} setData={setData}/>
              </div>
            )
         })}
        </div>
      </div>
    </>
  )
};

export default Followers;