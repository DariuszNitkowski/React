import React, {useState} from 'react';
import axios from "axios"

const Sell = (props) => {
    
    const{logged, email}=props.userState
    const[myProducts, setMyProducts]=useState([])
    
    
    const showSell=()=>{
        axios
        .get(`http://localhost:5000/product/list/${email}`)
        .then(res=>setMyProducts(res.data))
        .catch(err=>console.log("jakis błąd"))
    }

    const handleDelete=(id)=>{
        axios
        .delete(`http://localhost:5000/product/delete/${id}`)
        .then(()=>{
            let newList=myProducts.filter(product=>product._id!=id)
            setMyProducts(newList)
        })
        .catch(err=>console.log("jakis błąd"))
    }
    const handleEdit=(id)=>{
        let editedProduct=myProducts.find(ele=>ele._id===id)
        props.passData(editedProduct)
        props.history.push({pathname:"/editproduct"})
    }
    console.log("jestem w sell")

    return ( 
        <div id="body">
            <div>{myProducts.length>0?<ul>{myProducts.map(item=><li key={item._id}>{item.name}{item.price}
            <button onClick={()=>handleEdit(item._id)}>Edit</button>
            <button onClick={()=>handleDelete(item._id)}>Delete</button></li>)}</ul>:null}</div>
            
            {logged?<>
                <button onClick={showSell}>Show your sell offers</button>
                <div id="myOffers"><button onClick={()=>props.history.push({pathname:"/addproduct"})}>
                    Add new product to sell</button></div> </>:
            <div id="pageMsg">You need to log in</div>}
            
            
            
            
        </div>

     );
}
 
export default Sell;