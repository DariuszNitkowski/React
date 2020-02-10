import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router"
import axios from 'axios';


const ProductEdit = (match) => {
    let passedData=match.passedObject
    const logged=match.userState.logged    
    const [message, setMessage]=useState("")
    const [editedProduct, setEditedProduct]=useState({id:"", name:"", vol:"", description:"", category:"", price:""})
    
    useEffect(()=>{
        if (passedData.to!=="edit")setEditedProduct({id:"", name:"", vol:"", description:"", category:"", price:""})
        else{    
            setEditedProduct({
                id: passedData.data._id,
                name: passedData.data.name,
                vol: passedData.data.vol,
                description: passedData.data.description,
                category: passedData.data.category,
                price: passedData.data.price})}},[])
    
        
    const {id, name, vol, description, category, price}=editedProduct
    
    const handleChanges=(e)=>{
        var field=e.target.name
        var fieldsValue=e.target.value
        setEditedProduct(prevState=>({
            ...prevState,
            [field]: fieldsValue
        }))
        
    }
    const saveChanges=(e)=>{
        e.preventDefault()
        let err=""
        if (name.length===0 || vol.length===0 || description.length===0 || 
            price.length===0) err+="fill all fields"
        if (isNaN(price))err+=" price must be number"
        if (err.length>0) setMessage(err)
        else {
            let keywords=[]
            keywords.push(name, description, category)
            let newProduct={
                id: id, name: name, vol: vol, description: description, category: category, keywords: keywords, price: price}
            axios
            .post("http://localhost:5000/product/edit", newProduct)
            .then((res)=>{
                setMessage("Changes saved")
                setTimeout(()=>match.history.push({pathname:"/sell"}),5000)})
            .catch(()=>setMessage("Cant save changes"))
        }
            
}
    
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body"> 
            <div id="body">
            {logged?
            <form name="productForm" onSubmit={saveChanges}>
                <input name="name" type="text" value={name} onChange={handleChanges}/> <input name="vol" type="number" 
                value={vol} min={1} onChange={handleChanges}/><select name="category" onChange={handleChanges}><option>{category}</option><option>ssanie pałki</option></select>
                <textarea value={description} onChange={handleChanges} name="description"/><input type="text" 
                value={price} onChange={handleChanges} name="price"/><button>Save changes</button>
            </form>
            :
            <div id="pageMsg">You need to log in</div>}
         </div>   
        
        </div></>
     );
}
 
export default withRouter(ProductEdit);