import React from 'react';
import {withRouter} from "react-router"


const Basket = (props) => {
    
    
    const {shoppingList}=props.userState
    
    const handleDelte=(id)=>{
        props.setUserState((prevState=>({
            ...prevState,
            shoppingList: shoppingList.filter(item=>item.id!==id)
        })))
    }

    const handlePay=()=>{
        props.history.push({pathname: "/payment"})
    }
    
    console.log("w basket")
    return ( 
        <div className="body">
            {shoppingList.length!==0?<>
            <div id="basketTitle">Items in your basket</div>
            <table id="basketTable">
                <thead><tr><th>Name</th><th>Quantity</th><th>Price</th><th>Delete</th></tr></thead>
            <tbody>{shoppingList.map(item=><tr key={item.id}><td className="basketName">{item.name}</td><td className="basketVol">{item.vol}</td><td className="basketPrice">{item.price}</td><td className="basketBtn">
                <button onClick={()=>handleDelte(item.id)}>Delete</button></td></tr>)}</tbody>
    </table></>: <div id="emptyBasket">No items in your basket</div>}
    <div><button id="payBtn" onClick={handlePay}>Pay for items</button></div>
    </div>
     );
}

export default withRouter(Basket);