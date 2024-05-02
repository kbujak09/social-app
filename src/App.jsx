import { Context } from './contexts/context';
import Profile from './components/profile/Profile';
import NotLogged from './components/notLogged/NotLogged'
import Homepage from './components/homepage/Homepage';
import Following from './components/following/Following';
import Followers from './components/followers/Followers';
import MayKnow from './components/mayknow/MayKnow';
import PostPage from './components/postpage/PostPage';
import Loader from './components/loader/Loader';
import './App.scss';                  

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {

  const ip = '13.51.48.41:5000';

  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState();

  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;
  
  const fetchPosts = async (userId, cb) => {
    try {
      const res = await fetch(`http://${ip}/api/posts?userId=${userId}`, {
        headers: {
          Authorization: bearer,
        }
      });
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching posts failed: ', err);
    }
  }
  
  const fetchFollowing = async (userId, cb) => {
    try {
      const res = await fetch(`http://${ip}/api/users/${userId}/following`, {
        headers: {
          Authorization: bearer,
        }
      })
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching followed users failed: ', err);
    }
  }
  
  const fetchFollowers = async (userId, cb) => {
    try {
      const res = await fetch(`http://${ip}/api/users/${userId}/followers`, {
        headers: {
          Authorization: bearer,
        }
      })
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching followers failed: ', err);
    }
  }

  const fetchData = async () => {
    if (localStorage.token) {
      try {
        await Promise.all([
          fetchPosts(localStorage.userId, setPosts),
          fetchFollowing(localStorage.userId, setFollowing),
          fetchFollowers(localStorage.userId, setFollowers),
        ]);
        setUser(localStorage.token);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    else {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [localStorage.token]);

  if (isLoading) {
    return (
      <Loader sb={false}/>
    )
  }

  return (
    <Context.Provider value={{
                            setUser, 
                            posts, 
                            following, 
                            setFollowing, 
                            followers, 
                            setFollowers, 
                            isLoading,
                            fetchFollowing,
                            fetchFollowers,
                            fetchPosts,
                            setPosts,
                            userPosts,
                            setUserPosts,
                            currentProfile,
                            setCurrentProfile,
                            bearer,
                            ip
                            }}>
      <Routes>
        <Route path={'/login'} element={<NotLogged type={'login'}/>}/>
        <Route path={'/signup'} element={<NotLogged type={'register'}/>}/>
        <Route path={'/profile/followers'} element={<Followers/>}/>
        <Route path={'/profile/following'} element={<Following/>}/>
        <Route path={'/user/:userId/followers'} element={<Followers/>}/>
        <Route path={'/user/:userId/following'} element={<Following/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/mayknow'} element={<MayKnow/>}/>
        <Route path={'/user/:userId'} element={<Profile/>}/>
        <Route path={'/post/:postId'} element={<PostPage/>}/>
        <Route path={'/'} element={!user && !isLoading ? <NotLogged type={'greeting'}/> : <Homepage/>} exact/>
      </Routes>
    </Context.Provider>
  )
}

export default App;