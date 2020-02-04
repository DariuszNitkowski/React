import React, {useState} from 'react';

const DisplayProduct = (props) => {
    
    const [message, setMessage]=useState("")
    const {logged}=props.userState
    const{_id, name, description, vol, price, category, image}=props.passedObject
    
    
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">
            <div>jego imie to{name} a cena jego to aż {price}. Produktów dostępnych {vol}</div>
            <div>Produkt z kategorii {category}</div>            
        </div>
     </>
     );
}
 
export default DisplayProduct;