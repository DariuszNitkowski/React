import React, {useState, useEffect} from 'react';
import axios from "axios"

const Sell = (props) => {
    
    const{logged, email}=props.userState
    const[myProducts, setMyProducts]=useState([])
    const [message, setMessage]=useState("")
    
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/product/list/${email}`)
        .then(res=>setMyProducts(res.data))
        .catch(err=>setMessage("Cant load items from your basket"))},[])
    
    const showSingleProduct=(product)=>{
        props.passData({from: "sell", data: product, to: "singleproduct"})
        props.history.push({pathname:"/singleproduct"})}
        
    

    const handleDelete=(id)=>{
        axios
        .delete(`http://localhost:5000/product/delete/${id}`)
        .then(()=>{
            let newList=myProducts.filter(product=>product._id!==id)
            setMyProducts(newList)
        })
        .catch(err=>setMessage("Couldnt remove your sell offer"))
    }
    const handleEdit=(product)=>{
        props.passData({from: "sell", data: product, to: "edit"})
        props.history.push({pathname:"/editproduct"})
    }


    return ( <>
        <div id="userMsg">{message}</div>
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
        </div></>

     );
}
 
export default Sell;