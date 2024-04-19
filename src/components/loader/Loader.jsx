import styles from './loader.module.scss';
import SwipeBack from '../swipeback/SwipeBack';

import ReactLoading from 'react-loading';

const Loader = ({sb=true}) => {
  return (
    <div className={styles.loadingOuter}>
      {sb && <SwipeBack/>}
      <div className={styles.loadingInner}>
        <ReactLoading width='48px' type='spin'/>
      </div>
    </div>
  )
}

export default Loader;