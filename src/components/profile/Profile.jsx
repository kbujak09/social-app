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

  const { currentProfile, setCurrentProfile, bearer, ip } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  const [isFollowed, setIsFollowed] = useState();

  const checkIsFollowed = () => {
    if (!userId) {
      return setIsFollowed(true);
    }
    if (currentProfile && currentProfile.followers) {
      for (let user of currentProfile.followers) {
        if (user._id === localStorage.userId) {
          return setIsFollowed(true);
        }
      }
    }
    setIsFollowed(false);
  }
  

  const fetchUser = async () => {
    try {
      if (!userId) {
        userId = localStorage.userId;
      }
      const res = await fetch(`${ip}/api/users/${userId}`, {
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

  useEffect(() => {
    checkIsFollowed();
  }, [userId, currentProfile])

  if (isLoading) {
    return (
      <>
        <Loader sb={false}/>
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
          <FollowButton userId={currentProfile._id} size={'large'} setIsFollowedProfile={setIsFollowed}/>
        </div>

      </> : null}
      <ProfilePosts isFollowed={isFollowed} userId={userId ? userId : localStorage.userId}/>
    </div>
  )
};

export default Profile;