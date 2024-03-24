import styles from './followers.module.scss';
import SwipeBack from '../../swipeback/SwipeBack';
import Follower from './follower/Follower';

import { useState, useEffect } from 'react';

const Followers = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const data = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/followers`);
      const json = await data.json();
      setUsers(json);
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <SwipeBack path={'/profile'}/>
      <div className={styles.container}>
        {users && users.length > 0 && users.map(user => {
          return (
            <Follower user={user}/>
          )
        })}
      </div>
    </>
  )
};

export default Followers;