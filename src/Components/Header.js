import React, {useState} from 'react';
import Search from "./HeaderComponents/Search"
import Categories from "./HeaderComponents/Categories"


import {Link} from "react-router-dom"

const Header = (match) => {
    console.log("w header")
    const {logged, shoppingList, userName}=match.userState
    
    return ( 
        <div className="header">
            <Search/>
            <Categories/>
            {logged?
            <>
            <div className="login"> 
                <Link to="/">
                    <button onClick={()=>match.setUserState({logged: false})}>{userName} Logout</button>
                </Link></div>
                <div className="add">jakaś reklama, jakiś tekst</div>
                
                <div className="basket">
                <Link to="/basket">
                    <button>Go to cashier! items: {shoppingList.length}</button>
                </Link>
            </div>
                </> 
                : 
            <>
            <div className="login"> 
                <Link to="/login">
                    <button onClick={()=>match.history.push({pathname:"/login"})}>Login</button>
                </Link></div>
                <div className="add">jakaś reklama, jakiś tekst</div>
            </>} 
        </div>
     );
}
 
export default Header;