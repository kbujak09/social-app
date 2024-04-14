import { useState, useEffect } from 'react';

import styles from './mayknow.module.scss';
import UserMayKnow from './user/UserMayKnow';
import SwipeBack from '../swipeback/SwipeBack';

const MayKnow = () => {

  const [data, setData] = useState();

  useEffect(() => {
    fetchUsers();
  }, [])

  async function fetchUsers() {
    try {
      const data = await fetch(`http://localhost:5000/api/users/may-know?userId=${localStorage.userId}`);
      const json = await data.json();
      setData(json)
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
        <SwipeBack />
        {data && data.length > 0 && <div className={styles.innerContainer}>
        <div className={styles.title}>People you may know</div>
        <div className={styles.users}>
          {data.length > 0 && data.map(item => {
            return (
              <UserMayKnow setData={setData} data={data} user={item}/>
            )})
          }
        </div>
      </div>}
    </div>
  )
};

export default MayKnow;