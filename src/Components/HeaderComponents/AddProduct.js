import React, { useState } from 'react';
import axios from 'axios';
import {withRouter} from "react-router"
const transform = require('transform-images')


const AddProduct = (match) => {
    
    const [foto, setFoto]=useState("")
    const [message, setMessage]=useState("")
    const {logged, email, own}=match.userState
    const addProduct=(e)=>{
        e.preventDefault()
        // moze tutaj zastosowac FormData? moze by oczysciło troche miejsca w kodzie
        let err=""
        let productForm=document.forms["productForm"]
        let name=productForm["productName"].value
        let vol=productForm["productVol"].value
        let productDescr=productForm["productDescr"].value
        let category=productForm["category"].value
        let price=productForm["productPrice"].value
        if (name.length===0 || vol.length===0 || productDescr.length===0 || 
            price.length===0 || category==="What is your category?") err+="fill all fields"
        if (isNaN(price)){
            err+=" price must be number"
            productForm["productPrice"].value=""}
        if (err.length>0) setMessage(err)
        else {
            let keywords=[]
            keywords.push(name, productDescr, category)
            let newProduct={
                name: name, vol: vol, description: productDescr, category: category, keywords: keywords, price: price, owner: email}
            axios
            .post("http://localhost:5000/product/add", newProduct)
            .then((res)=>{
                setMessage("Product added")
                setTimeout(()=>match.history.push({pathname:"/sell"}),10000)})
            .catch(()=>setMessage("Cant add product, try again"))
        }
    
        }
    // to jest dopisane
    const plik=e=>{
        // console.log("przed zmianą sizu",event.target.files[0])
        // console.log(URL.createObjectURL(event.target.files[0]) )
        
        const source = URL.createObjectURL(e.target.files[0])
        console.log(source)
        // const options = {
        // width: 100,
        // height: 100,
        // output: 'image',
        // outputFilename: './output.png',
        // quality: 100
        // }
        // getbase
        transform(source, {width: 100, height: 100, outputFilename: 'output.png'})
        .then(image => console.log(image))
        .catch(error => console.error(error))}
    
    // setFoto(URL.createObjectURL(event.target.files[0]))
    // let blob = await fetch(url).then(r => r.blob());
    // ustawiam url w src img a url jest tworzony z obrazow ktore sa w pamieci.
    
    const loadImg =event=>{
        event.preventDefault()
        let fotka=new FormData()
        fotka.append("upload_preset", "cloudinary_place")
        fotka.append("file", foto)
        axios.post("https://api.cloudinary.com/v1_1/dm2jhvidl/image/upload", fotka)
        .then((res)=>console.log(res.data.url))
        .catch(()=>console.log("nie poszło"))
}

    const pobierzZdjecie=()=>{
        setFoto("http://res.cloudinary.com/dm2jhvidl/image/upload/v1581022229/nodnnljaernc5jem29gp.jpg")
        
    }

// zamieniłem logged na true na krótko
        return ( <>
            <div id="userMsg">{message}</div>
            <div id="body">
            {true?
            <form name="productForm" onSubmit={addProduct}>
                <div id="addName"><input name="productName" type="text" placeholder="name of product"/></div> 
                <div id="addVol"><input name="productVol" type="number" placeholder="items?" min={1}/></div>
                <div id="addCategory"><select name="category"><option>Which category?</option><option>ogrod</option></select></div>
                <div id="addDesc"><textarea placeholder="please describe your product" name="productDescr"/></div>
                <div id="addPrice"><input type="text" placeholder="what is a price for signle item" name="productPrice"/></div>
                <div id="addBtn"><button>Add product</button></div>
            </form>:
            <div id="pageMsg">You need to log in</div>}
            <form onSubmit={loadImg}>
            Please upload picture showing the product. Maximum size :...
            <div id="addImage"><input onChange={plik} type="file" name="pic" accept="image/*"/></div>
            <div id="addBtn"><button>Add product</button></div></form>
            
            <div id="addBtn"><button onClick={pobierzZdjecie}>Pokaż zdjęcie</button></div>
            <img src={foto}/>
         </div></>   
     );
}
 
export default withRouter(AddProduct);