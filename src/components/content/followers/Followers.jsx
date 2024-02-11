import styles from './followers.module.scss';
import MayKnow from './mayknow/MayKnow';

const Followers = () => {
  return (
    <div className={styles.container}>
      <MayKnow />
    </div>
  )
};

export default Followers;