import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from 'axios';

const ProductEdit = (match) => {
    const logged=match.userState.logged    
    const [message, setMessage]=useState("")
    const [editedProduct, setEditedProduct]=useState({
        id: match.passedObject._id,
        name: match.passedObject.name,
        vol: match.passedObject.vol,
        description: match.passedObject.description,
        category: match.passedObject.category,
        price: match.passedObject.price
    })
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
    
    console.log("jestem w edit body")
    return ( 
        <div id="body"> 
            <div id="body">
            {logged?<>
            <form name="productForm" onSubmit={saveChanges}>
                <input name="name" type="text" value={name} onChange={handleChanges}/> <input name="vol" type="number" 
                value={vol} min={1} onChange={handleChanges}/><select name="category" onChange={handleChanges}><option>{category}</option><option>ssanie pałki</option></select>
                <textarea value={description} onChange={handleChanges} name="description"/><input type="text" 
                value={price} onChange={handleChanges} name="price"/><button>Save changes</button>
            </form>
            <div id="userMSG">{message}</div></>:
            <div id="pageMsg">You need to log in</div>}
         </div>   
        
        </div>
     );
}
 
export default withRouter(ProductEdit);