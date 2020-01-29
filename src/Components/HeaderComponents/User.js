import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom"
import {withRouter} from "react-router"


const User = () => {
    
    console.log("w user")
    return ( 
    
        <div className="body">
            użytkownik, jesteś zalogowany lub nie
        </div>
    
    );
}
 
export default withRouter(User);