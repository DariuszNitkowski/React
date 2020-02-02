import React, {useState, useEffect, useReducer} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import OffersBody from "./Components/HeaderComponents/OffersBody"
import LoginBody from "./Components/HeaderComponents/LoginBody"
import CreateAccountBody from './Components/HeaderComponents/CreateAccountBody'
import Basket from "./Components/HeaderComponents/Basket"
import AddProduct from "./Components/HeaderComponents/AddProduct"
import Payment from "./Components/HeaderComponents/Payment"
import User from "./Components/HeaderComponents/User"
import Sell from "./Components/HeaderComponents/Sell"

import "./App.css"





function App() {
  
  const [userState, setUserState]=useState({
    logged: false,
    isLogin: false,
    email:"",
    userName: "",
    shoppingList:[],
    own: []})
    // {id:"a", name: "wiertarka", vol: 1, price: 120}, {id:"aa", name: "podpaska", vol: 2, price: 12}
  console.log("w głównym")
  return (
    <>

      <Router >
        <Route path="/" render={props=>(<Header {...props} userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/" exact render={props=>(<OffersBody userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/login" render={props=>(<LoginBody userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/create" render={props=>(<CreateAccountBody userState={userState}/>)}/>
        <Route path="/addproduct" render={props=>(<AddProduct {...props} userState={userState}/>)}/>
        <Route path="/sell" render={props=>(<Sell {...props} userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/basket" render={props=>(<Basket {...props} userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/payment" render={props=>(<Payment userState={userState}/>)}/>
        <Route path="/user" render={props=>(<User userState={userState}/>)}/>
        <Route path="/" component={Footer}/>
        
      </Router>
      
    </>
  );
}

export default App;
