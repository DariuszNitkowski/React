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
            {images?<><div id="spName">{name}</div>
            {images.map((photo, index)=><div key={index} className="spImg"><img src={photo} alt={name}/></div>)}
            <div id="spDescription">{description}</div><div id="spPrice">Price: {price} PLN</div></>:<div id="pageMsg">Search for the product to display</div>}
            {logged?<><div id="spVol"><input type="number" placeholder="items" min={1} max={vol}/></div>
            <div id="spBuyBtn"><button>Buy</button></div></>:null}
            <div id="spBack"><button onClick={()=>props.history.push({pathname: `/${gotFrom? gotFrom:""}`})}>Go back {gotFrom?gotFrom:"main"}</button></div>
        </div>
        </div>     
     </>        
     );
}
 
export default withRouter(DisplayProduct);