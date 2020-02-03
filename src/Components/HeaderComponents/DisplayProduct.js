import React, {useState} from 'react';

const DisplayProduct = (props) => {
    
    const [message, setMessage]=useState("")
    const {logged}=props.userState
    
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">

            tutaj będę wyświetlał pojedyńczą ofertę. będę tu trafiał z linka z offersbody 
            ale tez z basketa czy moze nawet z sella zeby wyświetlać prodkut który sprzedaję
        </div>
     </>
     );
}
 
export default DisplayProduct;