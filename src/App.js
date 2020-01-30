import React, {useState, useEffect, useReducer} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import OffersBody from "./Components/HeaderComponents/OffersBody"
import LoginBody from "./Components/HeaderComponents/LoginBody"
import CreateAccountBody from './Components/HeaderComponents/CreateAccountBody'
import Basket from "./Components/HeaderComponents/Basket"
import User from "./Components/HeaderComponents/User"
import "./App.css"





function App() {
  
  const [userState, setUserState]=useState({
    logged: false,
    isLogin: false,
    email:"",
    userName: "",
    shoppingList:[],
    message: ""})

  console.log("w głównym")
  return (
    <>

      <Router >
        <Route path="/" render={props=>(<Header {...props} userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/" exact component={OffersBody}/>
        <Route path="/login" render={props=>(<LoginBody userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/create" component={CreateAccountBody}/>
        <Route path="/basket" component={Basket}/>
        <Route path="/user" component={User}/>
        
        <Route path="/" component={Footer}/>
        
      </Router>
      
    </>
  );
}

export default App;
