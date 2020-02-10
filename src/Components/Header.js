import React, {useState} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import Add from "./HeaderComponents/Add"

var promotions=[]

const Header = (match) => {
    const {logged, shoppingList, userName}=match.userState
    const [searchingFor, setSearchingFor]=useState("")
    const [searchingCategories, setSearchingCategories]=useState("All categories")
    
    if (match.passedObject && match.passedObject.promotions) promotions=match.passedObject.promotions

    const handleSearch=(e)=>{
        setSearchingFor(e.target.value)
    }

    const handleCategories=(e)=>{
        setSearchingCategories(e.target.value)
    }
    
    const sendSearch=()=>{
        let category
        if (searchingCategories!=="All categories") category=""
        else category=searchingCategories
        match.passData({search: searchingFor, kind: category})
        match.history.push({pathname:"/"})
        setSearchingFor("")
        setSearchingCategories("")
    }


    
    console.log("w header")
    return ( 
        <div className="header">
            <div id="search">
            <input onChange={handleSearch} type="text" placeholder="search for products" value={searchingFor}/>
            </div>
            <div id="categories">
            <select onChange={handleCategories} value={searchingCategories}>
            <option>All categories</option>
                <option>Books</option>
                <option>Cars</option>
                <option>Clothing</option>
                <option>Health</option>
                <option>Home</option>
                <option>Sport</option>
                <option>Travel</option>

            </select></div>
            <div id="searchBtn"><button onClick={sendSearch}>Search</button></div>
            <div id="add">
                    <Add promotions={promotions} passData={match.passData}/>    
                </div>
            {logged?
            <>
            <div id="dropdown">
                <button>Menu</button>
                <div id="dropdown-content">
                    <div><Link to="/sell">My sell</Link></div>
                    <div id="divider">_____________</div>
                    <div><Link to="/"onClick={()=>match.setUserState({logged: false})}>{userName.substr(0,10)} Logout</Link></div>
                </div>
            </div>
                
                
            <div id="basket">
                <Link to="/basket">
                    <button>Go to cashier! items: {shoppingList.length}</button>
                </Link>
            </div></>: 
            
            <div id="login"> 
                <Link to="/login">
                    <button onClick={()=>match.history.push({pathname:"/login"})}>Login</button>
                </Link>
            </div>} 
        </div>
     );
}
 
export default withRouter(Header);