import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from "axios"

const Basket = (props) => {
    
    const [message, setMessage]=useState("")
    
    const {shoppingList, logged, email}=props.userState
    
    const handleDelte=(id)=>{
        let newShoppingList=shoppingList.filter(item=>item._id!==id)
        axios
        .post("http://localhost:5000/user/updateShopList", {user: email, shopList: newShoppingList})
        .then((res)=>{
            props.setUserState((prevState)=>({
                ...prevState,
                shoppingList: newShoppingList}))    
        })
        .catch(()=>setMessage("Cant connect to delete item"))
        }
    const handlePay=()=>{
        props.history.push({pathname: "/payment"})
    }
    
    console.log("w basket")
    return ( 
        <div id="body">
            {logged?<>{shoppingList.length!==0?<>
            <div id="pageMsg">Items in your basket</div>
            <table id="basketTable">
                <thead><tr><th>Name</th><th>Quantity</th><th>Price</th><th>Delete</th></tr></thead>
            <tbody>{shoppingList.map(item=><tr key={item.id}><td className="basketName">{item.name}</td><td className="basketVol">{item.vol}</td><td className="basketPrice">{item.price} PLN</td><td className="basketBtn">
                <button onClick={()=>handleDelte(item.id)}>Delete</button></td></tr>)}</tbody>
    </table><div><button id="payBtn" onClick={handlePay}>Pay for items</button></div></>: 
    <div id="pageMsg">No items in your basket</div>}</>:<div id="pageMsg">You need to log in</div>} 
    <div id="userMSG">{message}</div>
    </div>
     );
}

export default withRouter(Basket);