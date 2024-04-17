import styles from './user.module.scss';
import Avatar from '../avatar/Avatar';
import FollowButton from '../followbutton/FollowButton';

import { useNavigate, useLocation } from 'react-router-dom';

const User = ({user, isPost, isDelete, isLocal, data, setData}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const pathname = `/user/${user._id}`;

  const navigateToProfile = (userId) => {
    if (location.pathname !== pathname && userId !== localStorage.userId) {
      return navigate(`/user/${userId}`);
    }
  };

  return (
    <div className={`${styles.container} ${isPost ? styles.post : null}`}>
      <div className={styles.user} onClick={() => navigateToProfile(user._id)}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={`${styles.username} ${isPost ? styles.post : null}`}>
          {user.username}
        </div>
      </div>
      {!isPost && <FollowButton userId={user._id} isDelete={isDelete} isLocal={isLocal} data={data} setData={setData}/>}
    </div>
  )
};

export default User;