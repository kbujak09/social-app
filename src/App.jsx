import { useState, useEffect } from 'react';
import { LoginContext } from './contexts/LoginContext';
import NotLogged from './components/notLogged/NotLogged'
import Content from './components/content/Content';
import './App.scss';                                    

const App = () => {

  const [user, setUser] = useState('');

  useEffect(() => {
    if (localStorage.token) {
      setUser(localStorage.token)
    }
  }, [])


  return (
    <LoginContext.Provider value={{setUser}}>
      {!user ? <NotLogged /> : <Content/>}
    </LoginContext.Provider>
  )
}

export default App