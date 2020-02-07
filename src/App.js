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
import ProductEdit from "./Components/HeaderComponents/ProductEdit"
import DisplayProduct from "./Components/HeaderComponents/DisplayProduct"
import "./App.css"


var passedObject=""


function App() {
  
  
  
  const [userState, setUserState]=useState({
    logged: false,
    isLogin: false,
    email:"",
    userName: "",
    shoppingList:[],
    own: []})
  
    
  const passData=(...object)=>{
    passedObject=object
  }
  // do zrobienia: 
  
  //ogarniecie tej reklamy albo usuniecie
  //ostylowanie
  // wyswietlanie polecanych produktow
  
  //do zbadania:
  // w routach w backendzie jakies przesyłanie błedów zeby było lepiej niz console log! musi byc komunikacja
  // sprawdzic czy usuwa file1 po przejsciu do innego komponentu czy trzyma w pamieci. jesli trzyma
  //to jakis reset potrzebny. dodatkowo reset URL ów URL.revokeObjectURL()
  // czy url na bolb to naprawde tyle kodu? jesli tak to zostaje przy zmiennych dla zdjec
  
  // do poprawienia:
  //moze jakas refaktoryzacja w product edit bo wyglada ciezko
  // moze dodac jakies ostrzezenie przy usuwaniu produktu. jakis alert!

  
  console.log("w głównym")
  return (
    <>

      <Router >
        <Route path="/" render={props=>(<Header {...props} userState={userState} setUserState={setUserState} passData={passData} passedObject={passedObject}/>)}/>
        <Route path="/" exact render={props=>(<OffersBody userState={userState} setUserState={setUserState} passData={passData} passedObject={passedObject}/>)}/>
        <Route path="/login" render={props=>(<LoginBody userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/create" render={props=>(<CreateAccountBody userState={userState}/>)}/>
        <Route path="/addproduct" render={props=>(<AddProduct {...props} userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/sell" render={props=>(<Sell {...props} userState={userState} setUserState={setUserState} passData={passData}/>)}/>
        <Route path="/basket" render={props=>(<Basket {...props} userState={userState} setUserState={setUserState} passData={passData}/>)}/>
        <Route path="/payment" render={props=>(<Payment userState={userState}/>)}/>
        <Route path="/user" render={props=>(<User userState={userState}/>)}/>
        <Route path="/editproduct" render={props=>(<ProductEdit userState={userState} passedObject={passedObject}/>)}/>
        <Route path="/singleproduct" render={props=>(<DisplayProduct userState={userState} passedObject={passedObject}/>)}/>
        <Route path="/" component={Footer}/>
        
      </Router>
      
    </>
  );
}

export default App;
