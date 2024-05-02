import styles from './profile.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import User from './user/User';
import FollowButton from '../followbutton/FollowButton';
import ProfilePosts from './posts/ProfilePosts';
import Loader from '../loader/Loader';

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../contexts/context';

const Profile = () => {

  let { userId } = useParams();

  const { currentProfile ,setCurrentProfile, bearer, ip } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (!userId) {
        userId = localStorage.userId;
      }
      const res = await fetch(`http://${ip}/api/users/${userId}`, {
        headers: {
          Authorization: bearer,
        }
      });
      const user = await res.json();
      setCurrentProfile(user);
      setIsLoading(false);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <div className={styles.outerContainer}>
      <SwipeBack path={'/'}/>
      <div className={styles.innerContainer}>
        {currentProfile && <User user={currentProfile}/>}
      </div>
      {currentProfile._id !== localStorage.userId ? 
      <>
        <div className={styles.button}>
          <FollowButton userId={currentProfile._id} size={'large'}/>
        </div>

      </> : null}
      <ProfilePosts userId={userId ? userId : localStorage.userId}/>
    </div>
  )
};

export default Profile;