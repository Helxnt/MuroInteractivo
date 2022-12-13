import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";
import firebase from './firebase';
import HomeView from './pages/Inicio/Inicio'
import LoginView from './pages/Login/Login'
import SignupView from './pages/Signup/Signup'
import PostsView from './pages/Posts/Posts'


function App() {

  const [userName, setUserName] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.email);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<LoginView />}></Route>

        <Route path="/Signup" element={<SignupView />}></Route>

        <Route path="/Posts" element={<PostsView name={userName} />}></Route>

        <Route path="/" element={<HomeView name={userName} />}></Route>

      </Routes>
    </div>
  );
}


export default App;
