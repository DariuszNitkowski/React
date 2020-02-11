import React, { useState } from 'react';
import axios from 'axios';
import {withRouter} from "react-router"

var file1=""
var file2=""
var file3=""

const AddProduct = (match) => {
    
    const [foto, setFoto]=useState({"first":"","second":"","third":""})
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
            price.length===0 || category==="What category?") err+="fill all fields"
        if (isNaN(price)){
            err+=" price must be number"
            productForm["productPrice"].value=""}
        if (err.length>0) {
            setMessage(err)
            setTimeout(()=>setMessage(""), 5000)}
        else {
            uploadImages(name, vol, productDescr, category, price)
            
        }
    }

    const uploadImages = (name, vol, productDescr, category, price) => {
        setMessage("Uploding product")
        let fotos=[file1, file2, file3].filter(item=>item!=="")
        var adresses=[]
        const uploaders = fotos.map(file => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "cloudinary_place"); 
          formData.append("folder",email); 
          return axios.post("https://api.cloudinary.com/v1_1/dm2jhvidl/image/upload/", formData)
          .then(response =>adresses.push(response.data.url));
          })
        axios.all(uploaders)
        .then(() =>{
            let keywords=[]
            keywords.push(name, productDescr, category)
            let newProduct={
                name: name, vol: vol, description: productDescr, category: category, 
                keywords: keywords, price: price, owner: email, links: adresses}
            axios
            .post("http://localhost:5000/product/add", newProduct)
            .then((res)=>{
                setMessage("Product added")
                setTimeout(()=>match.history.push({pathname:"/sell"}),1000)})
            .catch(()=>{
                setMessage("Cant add product, try again")
                setTimeout(()=>setMessage(""), 5000)})})
        .catch(()=>setMessage("Cant add images"))}


    const imageChange=(e, fileOrder)=>{
        switch (fileOrder){
            case "first":
                file1=e.target.files[0]
                setFoto(prevState=>({
                    ...prevState,
                    [fileOrder]: URL.createObjectURL(file1)}))
                break
            case "second":
                file2=e.target.files[0]
                setFoto(prevState=>({
                    ...prevState,
                    [fileOrder]: URL.createObjectURL(file2)}))
                break
            case "third":
                file3=e.target.files[0]
                setFoto(prevState=>({
                    ...prevState,
                    [fileOrder]: URL.createObjectURL(file3)}))
                break
            default:
                break
        }
    }
    
    
    
    return ( <>
            <div id="userMsg">{message}</div>
            <div id="body">
            {logged?<div id="addProduct">
            <form name="productForm" onSubmit={addProduct}>
                <div id="addName"><input name="productName" type="text" placeholder="name of product"/></div> 
                <div id="addVol"><input name="productVol" type="number" placeholder="items?" min={1}/></div>
                <div id="addCategory"><select name="category"><option>What category?</option><option>Books</option>
                <option>Cars</option><option>Clothing</option><option>Health</option><option>Home</option>
                <option>Sport</option><option>Travel</option></select></div>
                <div id="addPrice"><input type="text" placeholder="price for signle item" name="productPrice"/></div>
                <div id="addDesc"><textarea placeholder="please describe your product" name="productDescr"/></div>
            
            
            <div id="addInfo">Please upload up to 3 pictures showing the product.</div>
            
            <div id="addImage1"><input onChange={(e)=>imageChange(e,"first")} type="file" name="pic1" accept="image/*"/></div>
            <div id="addImage2"><input onChange={(e)=>imageChange(e, "second")} type="file" name="pic2" accept="image/*"/></div>
            <div id="addImage3"><input onChange={(e)=>imageChange(e, "third")} type="file" name="pic3" accept="image/*"/></div>
            <div id="addBtn"><button>Add product</button></div></form></div>:
            <div id="pageMsg">You need to log in</div>}
            {(foto.first+foto.second+foto.third).length>0?<div id="imgAdddedAvatar">This foto will apear as avatar in main list of products<img  alt={""}src={foto.first?foto.first:foto.second?foto.second:foto.third?foto.third:null}/></div>:null}
            {foto.first?<div className="imgAddded">Those will be visible if product will be clicked<img src={foto.first} alt={""}/></div>:null}
            {foto.second?<div className="imgAddded"><img src={foto.second} alt={""}/></div>:null}
            {foto.third?<div className="imgAddded"><img src={foto.third} alt={""}/></div>:null}
         </div></>   
     );
}
 
export default withRouter(AddProduct);