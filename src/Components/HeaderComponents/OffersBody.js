import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import axios from "axios"



var currentVol=[]

const OffersBody = (match) => {
    const [message, setMessage]=useState("")
    const {logged, email, shoppingList}=match.userState
    const products=match.products
    
    const showSingleProduct=(product)=>{
        match.passData({from: "", data: product, to: "singleproduct"})
        match.history.push({pathname:"/singleproduct"})
    }

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
            .post("http://localhost:5000/product/changevol", newProductData)
            .then(()=>{
                let oldShoppingList=shoppingList
                let newProductBought={_id: id, name: name, vol: itemBought[id], price: price}
                let newShoppingList=[...oldShoppingList, newProductBought]
                axios
                .post("http://localhost:5000/user/updateShopList", {user: email, shopList: newShoppingList})
                .then((res)=>{
                    match.setUserState((prevState)=>({
                        ...prevState,
                        shoppingList: newShoppingList}))
                    products.find(item=>item._id==id).vol+=-itemBought[id]
                     
                    setMessage("You have just bought item")   
                })
                .catch(()=>setMessage("Something went wrong, probably connection"))
            })
            .catch(err=>{
                setMessage("Something went wrong, check your basket and try again")
            })
        }
    }
    
    

    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">
            <div id="products">
            
            {products.map((item=>item.vol!==0?<div className="row" key={item._id}><Link to="/singleproduct" onClick={()=>showSingleProduct(item)}>
            <div className="tableName">{item.name}</div><div className="tableDescr">
            {item.description}</div><div className="tableImg">{item.links.length>0?<img alt={item.name} src={item.links[0]}/>:"No photo"}</div>
            <div className="tablePrice">{item.price} PLN</div></Link>
            {logged?<><div className="tableVol"><input type="number" name={item._id} onChange={handleBidChange} placeholder="?" 
            min={1} max={item.vol} maxLength={6}/></div><div className="tableBuy">
            <button className="buyBtn" onClick={()=>handleBuy(item._id, item.name, item.price)}>Buy</button></div></>:null}
            </div>:null))}</div>
            
        </div></>
     );
}
 
export default withRouter(OffersBody);