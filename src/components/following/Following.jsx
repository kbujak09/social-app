import styles from './following.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import { Context } from '../../contexts/context';
import User from '../user/User';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Following = () => {

  const [data, setData] = useState([]);

  const { userId } = useParams();

  const { fetchFollowing, following } = useContext(Context);

  let i = 0;

  useEffect(() => {
    if (userId) {
      fetchFollowing(userId).then(res => setData(res));
    }
    else {
      setData(following);
    }
  }, []);

  return (
    data &&  <>
      <SwipeBack/>
      <div className={styles.container}>
        <div className={styles.title}>People you follow</div>
        <div className={styles.following}>
          {data && data.length > 0 && data.map(item => {
            return (
              <User key={i++} user={item}/>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default Following;  