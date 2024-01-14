import { useState } from 'react';
import { LoginContext } from './contexts/LoginContext';
import NotLogged from './components/notLogged/NotLogged'
import './App.scss';                                    

const App = () => {

  const [user, setUser] = useState('');

  return (
    <>
      {!user ? <NotLogged/> : null}
    </>
  )
}

export default App