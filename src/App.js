import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import OffersBody from "./Components/HeaderComponents/OffersBody"
import LoginBody from "./Components/HeaderComponents/LoginBody"
import CreateAccountBody from './Components/HeaderComponents/CreateAccountBody'
import Basket from "./Components/HeaderComponents/Basket"
import AddProduct from "./Components/HeaderComponents/AddProduct"
import Sell from "./Components/HeaderComponents/Sell"
import ProductEdit from "./Components/HeaderComponents/ProductEdit"
import DisplayProduct from "./Components/HeaderComponents/DisplayProduct"
import axios from "axios"
import "./App.css"


var passedObject=""
var promotions=[]

function App() {
  const [products, setProducts]=useState([])

  const [userState, setUserState]=useState({
    logged: false,
    isLogin: false,
    email:"",
    userName: "",
    shoppingList:[],
    own: []})
  const [message, setMessage]=useState("")
  
  useEffect(()=>{
    axios
    .get("http://localhost:5000/promotions")
    .then(res=>{
        promotions=res.data
        if (promotions.length>0){
        let many=promotions.map(item=>item.productId)
        axios.get(`http://localhost:5000/product/many/${many}`) 
        .then(res=>{
          setProducts(res.data)})
        .catch(()=>setMessage("Cant get products"))}
        else {
          axios.get("http://localhost:5000/product/") 
          .then(res=>{
            setProducts(res.data)})
          .catch(()=>setMessage("Cant get products"))
        }})
    .catch(()=>setMessage("Cant get products"))},[])

  
    
  const passData=(object)=>{
    passedObject=object
  }


  // do zrobienia: 
  
  //ostylowanie
  //35 znaków w add max!  
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
        <Route path="/" render={props=>(<Header {...props} userState={userState} setUserState={setUserState} passData={passData} setProducts={setProducts} promotions={promotions}/>)}/>
        <Route path="/" exact render={props=>(<OffersBody userState={userState} setUserState={setUserState} products={products} passData={passData}/>)}/>
        <Route path="/login" render={props=>(<LoginBody userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/create" render={props=>(<CreateAccountBody userState={userState}/>)}/>
        <Route path="/addproduct" render={props=>(<AddProduct {...props} userState={userState} setUserState={setUserState}/>)}/>
        <Route path="/sell" render={props=>(<Sell {...props} userState={userState} setUserState={setUserState} passData={passData}/>)}/>
        <Route path="/basket" render={props=>(<Basket {...props} userState={userState} setUserState={setUserState} passData={passData}/>)}/>
        <Route path="/editproduct" render={props=>(<ProductEdit userState={userState} passedObject={passedObject}/>)}/>
        <Route path="/singleproduct" render={props=>(<DisplayProduct userState={userState} passedObject={passedObject}/>)}/>
        <Route path="/" component={Footer}/>




      </Router>
      
    </>
  );
}

export default App;
