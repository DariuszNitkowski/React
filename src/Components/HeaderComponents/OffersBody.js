import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import axios from "axios"



var currentVol=[]
var promotions=[]
const OffersBody = (match) => {
    const [message, setMessage]=useState("")
    const [products, setProducts]=useState([])
    const {logged, email, shoppingList}=match.userState
    
    useEffect(()=>{
        if (match.passedObject && match.passedObject[0]!==null) {
                let query= `${match.passedObject[0].kind}:${match.passedObject[0].search}`
                axios
                .get(`http://localhost:5000/product/search/${query}`)
                .then((res)=>{
                    if (res.data.length===0) {
                        setMessage("No results")
                        setProducts([])
                        axios
                        .get("http://localhost:5000/promotions")
                        .then(res=>match.passData({promotions: res.data}))
                        .catch(()=>match.passData({promotions: ""}))
                    }
                    else {
                        setProducts(res.data)}})
                .catch(()=>setMessage("Cant load products"))}
        else {
            axios
            .get("http://localhost:5000/promotions")
            .then(res=>{
                match.passData(res.data)
                promotions=[]
                for (var item of res.data) promotions.append(item.productId)
                if (promotions.length>0){
                axios.get("http://localhost:5000/product/many", promotions) 
                .then(res=>setProducts(res.data))
                .catch(()=>setMessage("Cant get products"))}
                else {
                    axios.get("http://localhost:5000/product/") 
                    .then(res=>setProducts(res.data))
                    .catch(()=>setMessage("Cant get products"))
                }})
            .catch(()=>match.passData(""))}},
            [match.passedObject])

    const showSingleProduct=(id)=>{
        let productChosen=products.find((item)=>item._id===id)
        match.passData(productChosen, "")
        match.history.push({pathname:"/singleproduct"})
    }

    const handleBidChange=(e)=>{
        let newElement={[e.target.name]: e.target.value}
        let oldVol=currentVol.filter(item=>Object.keys(item)!==e.target.name)
        currentVol=[...oldVol, newElement]
        }

    const handleBuy=(id, name, price)=>{
        setMessage("")
        let itemBought=currentVol.filter(item=>Object.keys(item)===id)[0]
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
                    products.find(item=>item._id===id).vol+=-itemBought[id]
                     
                    setMessage("You have just bought item")   
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
            <div id="products">
            
            {products.map((item=>item.vol!==0?<div className="row" key={item._id}><Link to="/singleproduct" onClick={()=>showSingleProduct(item._id)}>
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