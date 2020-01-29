import React from 'react';
import {withRouter} from "react-router"


const Basket = () => {
    
    console.log("w basket")
    return ( 
        <div className="body">
            zrobiłeś takie i taki zakupy
        </div>
     );
}
 
export default withRouter(Basket);