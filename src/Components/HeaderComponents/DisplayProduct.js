import React, {useState} from 'react';
import {withRouter} from "react-router"

let name, description, vol, price, image, gotFrom=""
const DisplayProduct = (match) => {
    
    let passedData=match.passedObject
    if (passedData.length>0){
        name=passedData[0].name
        description=passedData[0].description
        vol=passedData[0].vol
        price=passedData[0].price
        image=passedData[0].image
        gotFrom=passedData[1]}
        
    const [message, setMessage]=useState("")
    const {logged}=match.userState
     
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">
            <div id="singleProduct">
            <div id="spName">Nazwa produktu {name}</div>
            <div id="spImage">{image}</div>
            <div id="spDescription">{description}</div>
            {gotFrom=="" && logged?<><div id="spVol"><input type="number" min={vol}/></div><div id="spPrice">{price}</div>
            <div id="spBuyBtn"><button>Buy</button></div></>:null}
            <div id="spBack"><button onClick={()=>match.history.push({pathname: `/${gotFrom}`})}>Go back to{gotFrom==""?" main":` ${gotFrom}`}</button></div>
        </div>
        </div>     
     </>        
     );
}
 
export default withRouter(DisplayProduct);