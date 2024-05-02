import styles from './followbutton.module.scss';
import { Context } from '../../contexts/context';

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

const FollowButton = ({userId, size, isDelete, data, setData}) => {

  const profileId = useParams(userId);

  const [isFollowed, setIsFollowed] = useState(undefined);

  const { following, setFollowing, fetchPosts, setPosts, setFollowers, bearer, ip } = useContext(Context);

  const isLocal = () => userId === localStorage.userId ? true : false;

  const checkIsFollowed = () => {
    for (let user of following) {
      if (user._id === userId) {
        return true;
      }
    }
    return false;
  }

  const deleteFollow = (userId) => {
    const list = following;
    const updatedFollowing = list.filter(item => item._id !== userId);
    setFollowing(updatedFollowing);
  }

  const updateFollow = async () => {
    if (checkIsFollowed()) {
      const res = await fetch(`http://${ip}/api/users/${localStorage.userId}/following?followedId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': bearer
        }
      });
      if (res.ok) {
        deleteFollow(userId);
        fetchPosts(localStorage.userId, setPosts);
        return setIsFollowed(false);
      }
      return console.error('Unfollowing failed!');
    }
    const res = await fetch(`http://${ip}/api/users/${localStorage.userId}/following?followedId=${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': bearer
      }
    });
    if (res.ok) {
      const json = await res.json();
      const user = json.user;
      const newFollowing = following;
      newFollowing.push(user);
      setFollowing(newFollowing);
      fetchPosts(localStorage.userId, setPosts);
      return setIsFollowed(true);
    }
    return console.error('Following failed!')
  }

  const removeFollower = async () => {
    try {
      const req = await fetch(`http://${ip}/api/users/${localStorage.userId}?followerId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': bearer
        }
      });

      if (req.ok) {
        const newFollowers = data.filter(item => item._id !== userId)
        setData(newFollowers);
        setFollowers(newFollowers);
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (checkIsFollowed()) {
      setIsFollowed(true);
    }
    else {
      setIsFollowed(false);
    }
  }, []);

  if (isFollowed === undefined || isLocal() === true) {
    return (
      <></>
    )
  }
  if (isDelete && Object.keys(profileId).length === 0) {
    return (
      <div className={`${styles.container} ${styles.delete} ${size === 'large' ? styles.large : null}`} onClick={removeFollower}>REMOVE</div>
    )
  }

  if (!isFollowed) {
    return (
      <div className={`${styles.container} ${styles.follow} ${size === 'large' ? styles.large : null}`} onClick={updateFollow}>FOLLOW</div>
    )
  }

  return (
    <div className={`${styles.container} ${styles.following} ${size === 'large' ? styles.large : null}`} onClick={updateFollow}>FOLLOWING</div>
  )
}

export default FollowButton;