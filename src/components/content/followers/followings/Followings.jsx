import { useState, useEffect } from 'react';

import styles from './followings.module.scss';
import UserFollowings from './userFollowings/UserFollowings';

const Followings = () => {

  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const data = await fetch(`http://192.168.0.16:5000/api/users/${localStorage.userId}/followings`);
      const json = await data.json();
      setData(json)
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    data && <div className={styles.container}>
      <div className={styles.title}>People you follow</div>
      <div className={styles.followings}>
        {data.length > 0 && data.map(item => {
          return (
            <UserFollowings setData={setData} data={data} user={item}/>
          )
        })}
      </div>
    </div>
  )
};

export default Followings;  