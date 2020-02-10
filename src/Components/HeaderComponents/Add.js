import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import axios from 'axios';

const Add = (match) => {
    
    const [current, setCurrent]=useState({productId:"", text:"This is spot for your add"})
    console.log(match.promotions)
    useEffect(()=>{
        if (match.promotions.length>0){
        setInterval(()=>{
            let randomIndex=Math.round(Math.random()*match.promotions.length)
            setCurrent(match.promotions[randomIndex])
    
        },1000)}

    },[])

    const displayProduct=(current)=>{
        axios.get("http://localhost:5000/product/findbyId", current.productId)   
        .then(res=>{
            match.passData(res.data)
            match.history.push({pathname: "/singleproduct"})})
    }

    console.log("w add, reklamie znaczy")
    return ( <>
        {match.promotions.length!==0?
        <Link to="/singleproduct" onClick={()=>displayProduct(current)}>
            {current.text}
        </Link>:
        current.text}
            </>
        

     );
}
 
export default withRouter(Add);