import styles from './followers.module.scss';
import MayKnow from './mayknow/MayKnow';
import Followings from './followings/Followings';

const Followers = () => {
  return (
    <div className={styles.container}>
      <Followings />
      <MayKnow />
    </div>
  )
};

export default Followers;