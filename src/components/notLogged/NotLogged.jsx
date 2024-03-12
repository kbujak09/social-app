import styles from './notLogged.module.scss' 
import Greeting from './greeting/Greeting';
import Logo from './logo/Logo';
import Creator from './creator/Creator';
import Login from './auth/Login';
import Register from './auth/Register';

const NotLogged = ({type}) => {

  if (type === 'greeting') {
    return (
      <div className={styles.container}>
        <Logo />
        <Greeting />
        <Creator />
      </div>
    )
  }

  if (type === 'login') {
    return (
      <div className={styles.container}>
        <Logo />
        <Login />
        <Creator />
      </div>
    )
  }

  if (type === 'register') {
    return (
      <div className={styles.container}>
        <Logo />
        <Register />
        <Creator />
      </div>
    )
  }
}

export default NotLogged;