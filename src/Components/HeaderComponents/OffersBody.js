import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from "axios"

const OffersBody = (match) => {
    const [message, setMessage]=useState("")
    const {logged, email, shoppingList}=match.userState
    const [products, setProducts]=useState([])
    
    const handleBuy=(id)=>{
        let oldShoppingList=shoppingList
        let newShoppingList=[...oldShoppingList, id]
        
        axios
        .post("http://localhost:5000/user/updateShopList", {user: email, shopList: newShoppingList})
        .then((res)=>{
            match.setUserState((prevState)=>({
                ...prevState,
                shoppingList: newShoppingList}))    
            
                console.log(res)})
        .catch(()=>setMessage("Something went wrong, probably connection"))
            }
               
    // useEffect(()=>{
    // axios.get("http://localhdost:5000/product")
    // .then(res=>setProducts(res.data))})  


        
        
            
            
    console.log("w ofersbody")
    return ( 
        <div id="body">
            <table id="products"><thead><tr><th>nazwa produktu</th><th>opis</th><th>foto</th><th>cena</th>
            <th>Items</th>{logged?<th>Kup</th>:null}
            </tr></thead>
            <tbody>{products.map((item=>item.vol!=0?<tr key={item.id}><td className="tableName">{item.name}</td><td className="tableDescr">
            {item.description}</td><td className="tableImg"><img src={item.image} className="productImageMedium"/></td>
            <td className="tablePrice">{item.price} PLN</td><td className="tableVol"><input type="number" placeholder="?" min={1} max={item.vol} maxLength={6}/></td>
            {logged?<td className="tableBuy"><button className="buyBtn" onClick={()=>handleBuy(item.id)}>Buy</button></td>:null}</tr>
            :null))}
            </tbody>
            </table> 
            
        </div>
     );
}
 
export default withRouter(OffersBody);