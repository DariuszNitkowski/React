import React, {useState} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import axios from "axios"



var currentVol=[]

const OffersBody = (match) => {
    const [message, setMessage]=useState("")
    const {logged, email, shoppingList}=match.userState
    const [products, setProducts]=useState([])
    
    
    
    const showProducts=()=>{
        axios.get("http://localhost:5000/product")
        .then(res=>{
            setProducts(res.data)
        })
        .catch(()=>setMessage("Cant get products"))
    }

    const showSingleProduct=(id)=>{
        let productChosen=products.find((item)=>item._id==id)
        match.passData(productChosen)
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
                let newProductBought={id: id, name: name, vol: itemBought[id], price: price}
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
    
    

    console.log("w ofersbody")
    return ( <>
        <div id="userMsg">{message}</div>
        <div id="body">
            <div id="products">
            
            {products.map((item=>item.vol!=0?<div className="row" key={item._id}><Link to="/singleproduct" onClick={()=>showSingleProduct(item._id)}><div className="tableName">{item.name}</div><div className="tableDescr">
            {item.description}</div><div className="tableImg"><img src={item.image} className="productImageMedium"/></div>
            <div className="tablePrice">{item.price} PLN</div></Link><div className="tableVol"><input type="number" name={item._id} onChange={handleBidChange} placeholder="?" min={1} max={item.vol} maxLength={6}/></div>
            {logged?<div className="tableBuy"><button className="buyBtn" onClick={()=>handleBuy(item._id, item.name, item.price)}>Buy</button></div>:null}</div>
            :null))}
            </div>
            {true?<button onClick={showProducts}>Show products</button>:null}
            <button onClick={showSingleProduct}>go to single product page</button>
        </div></>
     );
}
 
export default withRouter(OffersBody);