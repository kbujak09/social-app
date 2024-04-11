import styles from './status.module.scss';
import { Context } from '../../../../contexts/context';

import { useContext, useEffect, useState } from 'react';

const Status = ({userId}) => {

  const { following } = useContext(Context);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (following.includes(userId)) {
      setIsFollowed(true);
    }
  }, [])

  if (isFollowed) {
    return (
      <div className={`${styles.container} ${styles.followed}`}>following</div>
    )
  }

  return (
    <div className={`${styles.container} ${styles.follow}`}>follow</div>
  )
}

export default Status;