import styles from './error.module.scss';
import SwipeBack from '../swipeback/SwipeBack';

const Error = () => {
  return (
    <>
      <SwipeBack />
      <div className={styles.container}>
        Oops! The page you're looking for doesn't exist.
      </div>
    </>
  )
}

export default Error;