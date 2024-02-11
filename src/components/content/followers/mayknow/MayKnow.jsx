import { useState, useEffect } from 'react';

import styles from './mayknow.module.scss';
import Avatar from '../../../avatar/Avatar';

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
    data && data.length > 0 && <div className={styles.container}>
      <div className={styles.title}>People you may know</div>
      <hr className={styles.hr}/>
      {data.length > 0 && data.map(item => {
        return (
          <div className={styles.person}>
            <div className={styles.data}>
              <div className={styles.avatar}><Avatar id={item.avatar}/></div>
              <div className={styles.username}>{item.username}</div>
            </div>
            <div className={styles.button}>follow</div>
          </div>
        )
      })}
    </div>
  )
};

export default MayKnow;