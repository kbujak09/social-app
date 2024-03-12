import styles from './swipeback.module.scss';
import arrowBack from '../../../assets/arrow_back.svg';

import { useNavigate } from 'react-router-dom';

const SwipeBack = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container} onClick={() => navigate('/')}>
      <img className={styles.image} src={arrowBack} alt='arrow back'/>
    </div>
  )
}

export default SwipeBack;