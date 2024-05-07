import styles from './loader.module.scss';
import SwipeBack from '../swipeback/SwipeBack';

import ReactLoading from 'react-loading';

const Loader = ({sb=true}) => {
  return (
    ReactLoading && <div className={styles.loadingOuter}>
      {sb && <SwipeBack/>}
      <div className={styles.loadingInner}>
        <ReactLoading type='spin' width={'48px'}/>
      </div>
    </div>
  )
}

export default Loader;