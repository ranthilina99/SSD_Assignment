import './App.css';
import React, {useEffect} from "react";
import Routes from "./Components/routes/routes";
import Footer from "./umesh/footer/footer";
import Header from "./umesh/Header/header";
import {setToken} from "./setToken";
import store from "./Store";
import {LoadUser} from "./Actions/Authentication";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
function App() {
    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);
  return (
    <div>
        <Header/>
        <Routes/>
        <Footer/>
    </div>
  );
}

export default App;
