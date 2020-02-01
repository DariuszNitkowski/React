import React, { useState } from 'react';
import axios from 'axios';
import {withRouter} from "react-router"



const AddProduct = (match) => {

    const [message, setMessage]=useState("")
    const {logged, email}=match.userState
    const addProduct=(e)=>{
        e.preventDefault()
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
                name: name, vol: vol, description: productDescr, keywords: keywords, price: price, owner: email}
            axios
            .post("http://localhost:5000/product/add", newProduct)
            .then(()=>{
                setMessage("Product added")
                setTimeout(()=>match.history.push({pathname:"/"}),10000)})
            .catch(()=>setMessage("Cant add product, try again"))
        }
    
        }
    




    return ( 
        <div className="body">
            <form name="productForm" onSubmit={addProduct}>
                <input name="productName" type="text" placeholder="name of product"/> <input name="productVol" type="number" 
                placeholder="items?" min={1}/><select name="category"><option>What is your category?</option><option>ssanie pałki</option></select>
                <textarea placeholder="please describe your product" name="productDescr"/><input type="text" 
                placeholder="what is a price for signle item" name="productPrice"/><button>Add product</button>
            </form>
            {message}
         </div>   
     );
}
 
export default withRouter(AddProduct);