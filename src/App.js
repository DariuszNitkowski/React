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

const initialState = {
  logged: false,
  isLogin: false,
  userName: "",
  shoppingList:[],
  message: ""}

function reducer(state, action){
  switch(action.type){
    case "isLogin":{
      return{
        ...state,
        isLogin: true,
        message: "loguje sie"}}
    case "logged":{
      return{
        logged: true,
        isLogin: false,
        userName: "kutasiński",
        shoppingList: ["wibrator", "podpaska"],
        message: "Zalogowany"}}
    case "loggedOut":{
      return{
        logged: false,
        isLogin: false,
        userName: "",
        shoppingList:[],
        message: "wylogowany"}}

    case "wrongUser":{
      return{
        logged: false,
        isLogin: false,
        message: "Zła nazwa uzytkownika",
        shoppingList: []}}}}
  



function App() {
  
  const [userState, dispatch]=useReducer(reducer, initialState)
  console.log("w głównym")
  return (
    <>

      <Router >
        <Route path="/" render={props=>(<Header {...props} userState={userState} dispatch={dispatch}/>)}/>
        <Route path="/" exact component={OffersBody}/>
        <Route path="/login" render={props=>(<LoginBody userState={userState} dispatch={dispatch}/>)}/>
        <Route path="/create" component={CreateAccountBody}/>
        <Route path="/basket" component={Basket}/>
        <Route path="/user" component={User}/>
        
        <Route path="/" component={Footer}/>
        
      </Router>
      
    </>
  );
}

export default App;
