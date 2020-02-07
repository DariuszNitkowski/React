import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from "axios"

const Basket = (props) => {
    
    const [message, setMessage]=useState("")
    const {logged, shoppingList, email}=props.userState 


    const showSingleProduct=(id)=>{
        axios
        .get("htttp://localhost:5000/product/findbyId", id)
        .then((res=>{
            props.passData(res.data, "basket")
            props.history.push({pathname:"/singleproduct"})
        }))
        .catch(()=>setMessage("Cant load the product"))
    }

    const handleDelte=(idDel, volDel, index)=>{
        let volToDelete=(shoppingList.find(item=>item._id==idDel)).vol
        let newProductData={id: idDel, vol: volToDelete}
        axios
        .post("http://localhost:5000/product/changevol", newProductData)
        .then((res)=>{
            let newShoppingList=[...shoppingList]
            newShoppingList.splice(index, 1)
            axios
            .post("http://localhost:5000/user/updateShopList", {user: email, shopList: newShoppingList})
            .then((res)=>{
                props.setUserState((prevState)=>({
                    ...prevState,
                    shoppingList: newShoppingList}))    
                setMessage("You have deleted item")
            })
            .catch(()=>setMessage("Cant connect to delete item"))
            })
        .catch(()=>setMessage("Cant connect to delete item"))
        }


    const handlePay=()=>{props.history.push({pathname: "/payment"})}
    
        
    console.log("w basket")
    return ( <>
            <div id="userMsg">{message}</div>
            <div id="body">
            {logged?<>{shoppingList.length!==0?<>
            <div id="pageMsg">Items in your basket</div>
            <table id="basketTable">
                <thead><tr><th>Name</th><th>Quantity</th><th>Price</th><th>Delete</th><th>Display this product</th></tr></thead>
                <tbody>{shoppingList.map((item, index)=><tr key={index}><td className="basketName">{item.name}</td><td className="basketVol">{item.vol}</td>
                <td className="basketPrice">{item.price} PLN</td><td className="basketBtn">
                <button onClick={()=>handleDelte(item._id, item.vol, index)}>Delete</button></td>
                <td className="basketProdBtn"><button onClick={()=>showSingleProduct(item._id)}>Show</button></td></tr>)}</tbody>
                </table><div><button id="payBtn" onClick={handlePay}>Pay for items</button></div></>: 
                <div id="pageMsg">No items in your basket</div>}</>:<div id="pageMsg">You need to log in</div>} 
    </div></>
     );
    }

export default withRouter(Basket);