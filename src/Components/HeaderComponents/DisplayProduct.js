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
        images=passedData[0].links
        gotFrom=passedData[1]}
        
    const [message, setMessage]=useState("")
    const {logged}=match.userState
    console.log("jestem w display product", passedData, vol) 
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">
        
            <div id="singleProduct">
            <div id="spName">Nazwa produktu {name}</div>
            {images.first?<div id="spImg1"><img src={images.first}/></div>:null}
            {images.second?<div id="spImg2"><img src={images.second}/></div>:null}
            {images.third?<div id="spImg3"><img src={images.third}/></div>:null}
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