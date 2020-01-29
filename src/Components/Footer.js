import React from 'react';
import {withRouter} from "react-router"
import {Link} from "react-router-dom"

const Footer = React.memo(() => {
    
    console.log("w footer")
    return ( 
        <div className="footer">
            strona stworzona przez darka
            <Link to="/"><button>go to main site</button></Link>
        </div>
     );
})
 
export default withRouter(Footer);