import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from "axios"



var currentVol=[]

const OffersBody = (match) => {
    const [message, setMessage]=useState("")
    const {email, shoppingList}=match.userState
    // const [products, setProducts]=useState([])
    const logged=true
    const products=[{id: "blaba", name: "wiertarka", description: "takie tam gówno", image:"", price: 20, vol:3},
    {id: "laba", name: "podpaska", description: "higiena dla pań", image:"", price: 120, vol:5},
    {id: "ablaba", name: "cos tam innego", description: "takie tam gówno", image:"", price: 1, vol:300},
    {id: "fflaba", name: "strzałka", description: "nie wiadomo dla kogo to wogóle", image:"", price: 500, vol:500}]
    
    
    const handleBidChange=(e)=>{
        let newElement={[e.target.name]: e.target.value}
        let oldVol=currentVol.filter(item=>Object.keys(item)!=e.target.name)
        currentVol=[...oldVol, newElement]
        }

    const handleBuy=(id, name, price)=>{
        setMessage("")
        let itemBought=currentVol.filter(item=>Object.keys(item)==id)[0]
        if(!itemBought) setMessage("Please choose volume of item")
        else {
            let newProductData={id: id, vol: -itemBought[id]}
            axios
            .post("http://localhost/product/changevol", newProductData)
            .then(()=>{
                let oldShoppingList=shoppingList
                let newProductBought={id: id, name: name, vol: itemBought[id], price: price}
                let newShoppingList=[...oldShoppingList, newProductBought]
                axios
                .post("http://localhost:5000/user/updateShopList", {user: email, shopList: newShoppingList})
                .then((res)=>{
                    match.setUserState((prevState)=>({
                        ...prevState,
                        shoppingList: newShoppingList}))    
                })
                .catch(()=>setMessage("Something went wrong, probably connection"))
            })
            .catch(err=>{
                setMessage("Something went wrong, check your basket and try again")
            })
        }
    }
    
    

    console.log("w ofersbody")
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">
            <table id="products"><thead><tr><th>nazwa produktu</th><th>opis</th><th>foto</th><th>cena</th>
            <th>Items</th>{logged?<th>Kup</th>:null}
            </tr></thead>
            <tbody>{products.map((item=>item.vol!=0?<tr key={item.id}><td className="tableName">{item.name}</td><td className="tableDescr">
            {item.description}</td><td className="tableImg"><img src={item.image} className="productImageMedium"/></td>
            <td className="tablePrice">{item.price} PLN</td><td className="tableVol"><input type="number" name={item.id} onChange={handleBidChange} placeholder="?" min={1} max={item.vol} maxLength={6}/></td>
            {logged?<td className="tableBuy"><button className="buyBtn" onClick={()=>handleBuy(item.id, item.name, item.price)}>Buy</button></td>:null}</tr>
            :null))}
            </tbody>
            </table> 
            
        </div></>
     );
}
 
export default withRouter(OffersBody);