import styles from './user.module.scss';
import Avatar from '../avatar/Avatar';
import FollowButton from '../followbutton/FollowButton';

import { useNavigate } from 'react-router-dom';

const User = ({user, isPost, isDelete, isLocal, data, setData}) => {

  const navigate = useNavigate();

  const navigateToProfile = (userId) => navigate(`/user/${userId}`);

  return (
    <div className={styles.container}>
      <div className={styles.user} onClick={() => navigateToProfile(user._id)}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={`${styles.username} ${isPost ? styles.post : null}`}>
          {user.username}
        </div>
      </div>
      <FollowButton userId={user._id} isDelete={isDelete} isLocal={isLocal} data={data} setData={setData}/>
    </div>
  )
};

export default User;