import React, {useState} from 'react';
import Search from "./HeaderComponents/Search"
import Categories from "./HeaderComponents/Categories"

import {Link} from "react-router-dom"

const Header = (match) => {
    console.log("w header")
    return ( 
        <div className="header">
            <Search/>
            <Categories/>
            {match.userState.logged?
            <>
            <div className="login"> 
                <Link to="/">
                    <button onClick={()=>match.dispatch({type: "loggedOut"})}>Logout</button>
                </Link></div>
                <div className="add">jakaś reklama, jakiś tekst</div>
                
                <div className="basket">
                <Link to="/basket">
                    <button>Go to cashier! items: {match.userState.shoppingList.length}</button>
                </Link>
            </div>
                </> 
                : 
            <>
            <div className="login"> 
                <Link to="/login">
                    <button onClick={()=>match.dispatch({type:"logged"})}>Login</button>
                </Link></div>
                <div className="add">jakaś reklama, jakiś tekst</div>
            </>} 
        </div>
     );
}
 
export default Header;