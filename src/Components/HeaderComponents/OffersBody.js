import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router"
import axios from "axios"

const OffersBody = (match) => {
    var baza
    const logged=match.userState.logged
    // const [products, setProducts]=useState([
    //     {id:"a",name:"podpaska", vol: 2, description:"coś dla pań", keywords:["higiena", "zdrowie"],image:"./pobrane.jpg", price: ""},
    //     {id:"b",name:"wibrator", vol: 23, description:"cos dla pań", keywords:["sex", "dla dorosłych"],image:"./wibrator.jpg", price: 128880}])
    const [products, setProducts]=useState("")
    useEffect(()=>{
        axios.get("http://localhost:5000/user")
        .then(res=>console.log())})
            // setProducts(res.data.map(prod=><li key={prod._id}>{prod.name}</li>)))
    
    const handleBuy=(id)=>{
        let iteminBasket=match.userState.shoppingList
        iteminBasket.push(id)
        match.setUserState((prevState)=>({
            ...prevState,
            shoppingList: iteminBasket}))
            //tutaj dodać axiosa zeby dodawał do uzytkownika. dodać odejmowanie z itemów
        
    }




    console.log("w ofersbody")
    return ( 
        <div id="body">
            {/* <table id="products"><thead><tr><th>nazwa produktu</th><th>opis</th><th>foto</th><th>cena</th>
            <th>Items</th>{logged?<th>Kup</th>:null}
            </tr></thead>
            <tbody>{products.map((item=>item.vol!=0?<tr key={item.id}><td className="tableName">{item.name}</td><td className="tableDescr">
            {item.description}</td><td className="tableImg"><img src={item.image} className="productImageMedium"/></td>
            <td className="tablePrice">{item.price} PLN</td><td className="tableVol"><input type="number" placeholder="?" min={1} max={item.vol} maxLength={6}/></td>
            {logged?<td className="tableBuy"><button className="buyBtn" onClick={()=>handleBuy(item.id)}>Buy</button></td>:null}</tr>
            :null))}
            </tbody>
            </table>  */}
            <ul>{baza}</ul>
        </div>
     );
}
 
export default withRouter(OffersBody);