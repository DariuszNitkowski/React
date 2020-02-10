import React from 'react';
import {withRouter} from "react-router"

let name, description, vol, price, images, gotFrom=""
const DisplayProduct = (match) => {
    
    let passedData=match.passedObject
    if (passedData.length>0 && passedData[0]!==null){ 
        name=passedData[0].name 
        description=passedData[0].description
        vol=passedData[0].vol
        price=passedData[0].price
        images=passedData[0].links
        gotFrom=passedData[1]}
        
    const {logged}=match.userState
    console.log("jestem w display product", passedData, vol) 
    return ( <>
        <div id="body">
        
            <div id="singleProduct">
            {images?<><div id="spName">Nazwa produktu {name}</div>
            <div id="spImg1"><img src={images.first} alt={name}/></div>
            <div id="spImg2"><img src={images.second} alt={name}/></div>
            <div id="spImg3"><img src={images.third} alt={name}/></div>
            <div id="spDescription">{description}</div></>:<div id="pageMsg">Search for the product to display</div>}
            {gotFrom==="" && logged?<><div id="spVol"><input type="number" min={vol}/></div><div id="spPrice">{price}</div>
            <div id="spBuyBtn"><button>Buy</button></div></>:null}
            <div id="spBack"><button onClick={()=>match.history.push({pathname: `/${gotFrom? gotFrom:""}`})}>Go back {gotFrom?gotFrom:"main"}</button></div>
        </div>
        </div>     
     </>        
     );
}
 
export default withRouter(DisplayProduct);