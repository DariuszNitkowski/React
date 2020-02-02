import React from 'react';


const Sell = (props) => {
    
    const{logged, own}=props.userState
    
    return ( 
        <div id="body">
            {logged?
            <>{own.length>0?<div>tutaj moje oferty</div>
            
            
            :<div id="pageMsg">You dont sell anything</div>}
            <div><button onClick={()=>props.history.push({pathname:"/addproduct"})}>Add new product to sell</button></div></>:
            <div id="pageMsg">You need to log in</div>}

        </div>

     );
}
 
export default Sell;