import styles from './profile.module.scss';
import SwipeBack from './swipeback/SwipeBack';

import { useState, useEffect } from 'react';

const Profile = () => {

  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://192.168.0.19:5000/api/users/${localStorage.userId}`);
      const user = await res.json();
      await setUser(user);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchUser();
    console.log(user);
  }, []);

  return (
    <div className={styles.container}>
      <SwipeBack />
    </div>
  )
};

export default Profile;