import styles from './followers.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import Follower from './follower/Follower';
import { Context } from '../../contexts/context';

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Followers = () => {

  const [data, setData] = useState([]);

  const { userId } = useParams();

  const { followers, fetchFollowers } = useContext(Context);

  const checkIsLocal = () => userId === localStorage.userId ? true : false;

  useEffect(() => {
    if (userId) {
      fetchFollowers(userId).then(res => setData(res));
    }
    else {
      setData(followers);
    }
  }, [])

  return (
    <>
      <SwipeBack/>
      <div className={styles.container}>
        <div className={styles.title}>Followers</div>
        <div className={styles.followers}>
          {data && data.length > 0 && data.map(user => {
            return (
              <Follower isLocalUser={checkIsLocal} user={user} setUsers={setData} users={data}/>
            )
         })}
        </div>
      </div>
    </>
  )
};

export default Followers;