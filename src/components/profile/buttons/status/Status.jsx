import styles from './status.module.scss';
import { Context } from '../../../../contexts/context';

import { useContext, useEffect, useState } from 'react';

const Status = ({userId}) => {

  const { following, setFollowing, fetchPosts, setPosts } = useContext(Context);

  const [isFollowed, setIsFollowed] = useState(false);

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
    const updatedFollowing = list.filter(item => item._id === userId);
    console.log(list, updatedFollowing);
    setFollowing(updatedFollowing);
  }

  const updateFollow = async () => {
    if (checkIsFollowed()) {
      const res = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/unfollow?followedId=${userId}`, {
        method: 'POST'
      });
      if (res.ok) {
        deleteFollow();
        fetchPosts(localStorage.userId).then(data => setPosts(data));
        return setIsFollowed(false);
      }
      return console.error('Unfollowing failed!');
    }
    const res = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/follow?followedId=${userId}`, {
      method: 'POST'
    });
    if (res.ok) {
      const json = await res.json();
      const user = json.user;
      setFollowing([...following, user]);
      fetchPosts(localStorage.userId).then(data => setPosts(data));
      return setIsFollowed(true);
    }
    return console.error('Following failed!')
  }

  useEffect(() => {
    if (checkIsFollowed()) {
      setIsFollowed(true);
    }
  }, []);

  if (isFollowed) {
    return (
      <div className={`${styles.container} ${styles.followed}`} onClick={updateFollow}>following</div>
    )
  }

  return (
    <div className={`${styles.container} ${styles.follow}`} onClick={updateFollow}>follow</div>
  )
}

export default Status;