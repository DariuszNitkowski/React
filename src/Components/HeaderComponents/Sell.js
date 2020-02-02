import React, {useState} from 'react';
import axios from "axios"

const Sell = (props) => {
    
    let email=["darnit@poczta.onet.pl", "wodzu41@wp.pl"]
    const{logged, own}=props.userState
    const[myProducts, setMyProducts]=useState([])
    const showSell=()=>{
        axios
        .get(`http://localhost:5000/product/list/${email}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log("jakis błąd"))
    }

    

    return ( 
        <div id="body">
            {logged?<>
                <button onClick={showSell}>Show your sell offers</button>
                <div id="myOffers"><button onClick={()=>props.history.push({pathname:"/addproduct"})}>
                    Add new product to sell</button></div> </>:
            <div id="pageMsg">You need to log in</div>}
            
            
            
            
        </div>

     );
}
 
export default Sell;