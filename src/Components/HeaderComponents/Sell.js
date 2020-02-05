import React, {useState, useEffect} from 'react';
import axios from "axios"

const Sell = (props) => {
    
    const{logged, email}=props.userState
    const[myProducts, setMyProducts]=useState([])
    
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/product/list/${email}`)
        .then(res=>setMyProducts(res.data))
        .catch(err=>console.log("jakis błąd"))},[])
    
    const showSingleProduct=(product)=>{
        props.passData(product, "sell")
        props.history.push({pathname:"/singleproduct"})}
        
    

    const handleDelete=(id)=>{
        axios
        .delete(`http://localhost:5000/product/delete/${id}`)
        .then(()=>{
            let newList=myProducts.filter(product=>product._id!=id)
            setMyProducts(newList)
        })
        .catch(err=>console.log("jakis błąd"))
    }
    const handleEdit=(product)=>{
        // let editedProduct=myProducts.find(ele=>ele._id===id)
        props.passData(product)
        props.history.push({pathname:"/editproduct"})
    }

    console.log("jestem w sell")

    return ( 
        <div id="body">
            {logged?<>
            <div>{myProducts.length>0?<><div id="sellTitle">Products you are currently selling</div><ul>{myProducts.map(item=><li key={item._id}>
            <div id="sellName">{item.name}</div><div id="sellPrice">{item.price}</div>
            <div id="sellEditBtn"><button onClick={()=>handleEdit(item)}>Edit</button></div>
            <div id="sellDeleteBtn"><button onClick={()=>handleDelete(item._id)}>Delete</button></div>
            <div id="sellDisplayBtn"><button onClick={()=>showSingleProduct(item)}>Display this offer</button></div>
            </li>)}</ul></>:null}</div>
            <div id="addProductBtn"><button onClick={()=>props.history.push({pathname:"/addproduct"})}>
            Add new product to sell</button></div> </>:
            <div id="pageMsg">You need to log in</div>}
        </div>

     );
}
 
export default Sell;