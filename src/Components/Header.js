import React, {useState} from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import Add from "./HeaderComponents/Add"

const Header = (match) => {
    const {logged, shoppingList, userName}=match.userState
    const [searchingFor, setSearchingFor]=useState({search:"", kind:""})
    
    if (match.passedObject.length>0) const promotions=match.passedObject

    const handleSearch=(e, type)=>{
        setSearchingFor({search: e.target.value, kind: type})
    }
    const sendSearch=()=>{
        match.passData(searchingFor)
        match.history.push({pathname:"/"})
        setSearchingFor({search:"", kind:""})
    }
    
    console.log("w header")
    return ( 
        <div className="header">
            <div id="search">
            <input onChange={(event)=>handleSearch(event, "keywords")}type="text" placeholder="search for products" value={searchingFor.search}/>
            </div>
            <div id="categories">
            <select onChange={(event)=>handleSearch(event, "category")} value={searchingFor.search}>
            <option>choose category</option>
                <option>ogr</option>
                <option>gór</option>
                <option>grz</option>
                <option>sra</option>
                <option>skw</option>
            </select></div>
            <div id="searchBtn"><button onClick={sendSearch}>Search</button></div>
            {logged?
            <>
            <div id="dropdown">
                <button>Menu</button>
                <div id="dropdown-content">
                <div><Link to="/user">Settings</Link></div>
                <div><Link to="/sell">My sell</Link></div>
                <div id="divider">_____________</div>
                <div><Link to="/"
                     onClick={()=>match.setUserState({logged: false})}>{userName.substr(0,10)} Logout</Link></div>
                
                </div>
                </div>
                <div id="add">
                    <Add promotions={promotions}
                        passData={match.passData}/>    
                </div>
                
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
 
export default withRouter(Header);