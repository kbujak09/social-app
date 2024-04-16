import { useState, useEffect } from 'react';

import styles from './mayknow.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import User from '../user/User';

const MayKnow = () => {

  const [data, setData] = useState();

  let i = 0;

  const fetchUsers = async () => {
    try {
      const data = await fetch(`http://localhost:5000/api/users/may-know?userId=${localStorage.userId}`);
      const json = await data.json();
      setData(json)
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  if (data && data.length === 0) {
    return (
      <div className={styles.container}>
        <SwipeBack />
        <div className={styles.empty}>All users followed!</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
        <SwipeBack />
        {data && data.length > 0 && <div className={styles.innerContainer}>
        <div className={styles.title}>People you may know</div>
        <div className={styles.users}>
          {data.length > 0 && data.map(item => {
            return (
              <User key={i++} user={item}/>
            )})
          }
        </div>
      </div>}
    </div>
  )
};

export default MayKnow;