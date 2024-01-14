import logo from '../../../assets/logo.webp';
import styles from './logo.module.scss';
import { useNavigate } from 'react-router-dom';

const Logo = () => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} className={styles.logo}>
      <img src={logo} alt="logo" />
    </div>
  )
}

export default Logo;