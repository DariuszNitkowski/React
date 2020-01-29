import React, { useState, useEffect, forceUpdate} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom"
import {withRouter} from "react-router"

const LoginBody = (match) => {
    
    
    console.log("w login body")
    return ( 
        <div className="body">
            <div>email<input type="text" /></div>
            <div>password<input type="text" /></div>
            <div><button onClick={()=>match.dispatch({type:"wrongUser"})}>wprowadź złego uzytkownika</button></div>
            <div><span>{match.userState.message}</span></div>
            
        
            <div><Link to="/create">Utwórz konto</Link></div>
            
       
        </div>
     );
}
 
export default withRouter(LoginBody);