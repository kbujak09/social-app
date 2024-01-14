import styles from './notLogged.module.scss' 
import Greeting from './greeting/Greeting';
import Logo from './logo/Logo';
import Creator from './creator/Creator';
import {Routes, Route} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';

const NotLogged = () => {

  return (
    <div className={styles.container}>
      <Logo />
      <Routes>
        <Route path={'/'} element={<Greeting/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/signup'} element={<Register/>}/>
      </Routes>
      <Creator />
    </div>
  )
}

export default NotLogged;