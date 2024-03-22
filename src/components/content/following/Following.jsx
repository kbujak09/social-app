import { useState, useEffect } from 'react';

import styles from './following.module.scss';
import UserFollowing from './userFollowing/UserFollowing';
import SwipeBack from '../../swipeback/SwipeBack';

const Following = () => {

  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const data = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/following`);
      const json = await data.json();
      setData(json)
    }
    catch (err) {
      console.error(err);
    }
  }

  console.log(data)

  return (
    data &&  <>
      <SwipeBack path={'/profile'}/>
      <div className={styles.container}>
        <div className={styles.title}>People you follow</div>
        <div className={styles.following}>
          {data.length > 0 && data.map(item => {
            return (
              <UserFollowing setData={setData} data={data} user={item}/>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default Following;  