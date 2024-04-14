import styles from './mayknownavigate.module.scss';

import { Link } from 'react-router-dom';

const MayKnowNavigate = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={'/mayknow'}>Find people to follow!</Link>
    </div>
  )
}

export default MayKnowNavigate;