import styles from './followers.module.scss';
import SwipeBack from '../../swipeback/SwipeBack';

import { useState, useEffect } from 'react';

const Followers = () => {

  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const data = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/followers`);
      const json = await data.json();
      setData(json);
    }
    catch (err) {
      console.error(err);
    }
  }

  console.log(data);

  return (
    <>
      <SwipeBack path={'/profile'}/>
      <div className={styles.container}>
        {data && data.length > 0 && data.map(item => {
          return (
            <div>{data.username}</div>
          )
        })}
      </div>
    </>
  )
};

export default Followers;