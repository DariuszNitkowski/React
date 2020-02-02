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
            <div id="dropdown">
                <button>Menu</button>
                <div id="dropdown-content">
                <div><Link to="/user">Settings</Link></div>
                <div><Link to="/sell">My sell</Link></div>
                <div id="divider">_____________</div>
                <div><Link to="/"
                     onClick={()=>match.setUserState({logged: false})}>{userName} Logout</Link></div>
                
                </div>
                </div>
                <div id="add">jakaś reklama, jakiś tekst</div>
                
                <div id="basket">
                <Link to="/basket">
                    <button>Go to cashier! items: {shoppingList.length}</button>
                </Link>
                </div>
                </> 
                : 
            <>
            <div id="login"> 
                <Link to="/login">
                    <button onClick={()=>match.history.push({pathname:"/login"})}>Login</button>
                </Link></div>
                <div id="add">jakaś reklama, jakiś tekst</div>
            </>} 

            

        </div>
     );
}
 
export default Header;