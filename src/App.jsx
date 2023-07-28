import './App.css';
import React, {useState} from "react";
import jwt_decode from "jwt-decode";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Create from './components/Create';
import Post from './components/Post';
import PostPage from './components/PostPage';
import PostEdit from './components/PostEdit';
import CommentEdit from './components/CommentEdit';



function App() {

  const [userDetails, setUserDetails] = useState([]);

  function CheckUserId () {
    if (localStorage.getItem('jwt') !== undefined) {
      let jwt = localStorage.getItem('jwt');
      let jwtdecoded = jwt_decode(jwt);
      let userid = jwtdecoded._id;
      return userid;
    }
  }

  function Loginset (username, password) {
    setUserDetails(username, password);
    return;
  }

  function LogOutset () {
    localStorage.removeItem('jwt');
    setUserDetails([]);
    return;
  }

    return (
      <HashRouter basename='/'>
        <div className='App'>
          <Navbar data={userDetails} onLogOut={LogOutset}/>
          <Routes>
            <Route path="/" element={<Home data={userDetails} />} />
            <Route path="/login" element={<Login data={userDetails} onLogIn={Loginset}/>} />
            <Route path="/signup" element={<Signup data={userDetails}/>} />
            <Route path="/user" element={<User data={userDetails} onLoad={CheckUserId}/>} />
            <Route path="/create" element={<Create onLoad={CheckUserId}/>} />
            <Route path="/post" element={<Post />}>
              <Route path=":postid" element={<PostPage data={userDetails} onComment={CheckUserId}/>}>
                <Route path="edit" element={<PostEdit onLoad={CheckUserId}/>} />
                <Route path=":commentid" element={<CommentEdit onLoad={CheckUserId}/>} />
              </Route>
            </Route>
          </Routes>
        </div>
      </HashRouter>
    )

 
}

export default App;
