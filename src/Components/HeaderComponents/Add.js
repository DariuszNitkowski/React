import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import axios from 'axios';

const Add = (match) => {
    
    const [current, setCurrent]=useState({productId:"", text:"This is spot for your add"})
    var promotionsCheck=match.promotions.length>0
    useEffect(()=>{
        if (promotionsCheck){
            setInterval(()=>{
            let randomIndex=Math.floor(Math.random()*match.promotions.length)
            setCurrent(match.promotions[randomIndex])
        },10000)}

    },[promotionsCheck])

    const displayProduct=(current)=>{
        axios.get(`http://localhost:5000/product/findbyId/${current.productId}`)   
        .then(res=>{
            match.passData({from: "", data: res.data, to: "singleproduct"})
            match.history.push({pathname: "/singleproduct"})})
    }

    return ( <>
        {current.productId!==""?
        <Link to="/singleproduct" onClick={()=>displayProduct(current)}>
            {current.text}
        </Link>:
        current.text}
            </>
        

     );
}
 
export default withRouter(Add);