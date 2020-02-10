import React from 'react';
import {withRouter} from "react-router"

let name, description, vol, price, images, gotFrom=""
const DisplayProduct = (props) => {
    let passedData=props.passedObject
    if (passedData.to==="singleproduct"){ 
        name=passedData.data.name 
        description=passedData.data.description
        vol=passedData.data.vol
        price=passedData.data.price
        images=passedData.data.links
        gotFrom=passedData.from}
        
    const {logged}=props.userState
    return ( <>
        <div id="body">
        
            <div id="singleProduct">
            {images?<><div id="spName">Name of product {name}</div>
            <div id="spImg1"><img src={images.first} alt={name}/></div>
            <div id="spImg2"><img src={images.second} alt={name}/></div>
            <div id="spImg3"><img src={images.third} alt={name}/></div>
            <div id="spDescription">{description}</div></>:<div id="pageMsg">Search for the product to display</div>}
            {gotFrom==="" && logged?<><div id="spVol"><input type="number" min={vol}/></div><div id="spPrice">{price}</div>
            <div id="spBuyBtn"><button>Buy</button></div></>:null}
            <div id="spBack"><button onClick={()=>props.history.push({pathname: `/${gotFrom? gotFrom:""}`})}>Go back {gotFrom?gotFrom:"main"}</button></div>
        </div>
        </div>     
     </>        
     );
}
 
export default withRouter(DisplayProduct);