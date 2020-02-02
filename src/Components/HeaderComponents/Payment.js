import React from 'react';
import {withRouter} from "react-router"


const Payment = (match) => {
    
    const logged=match.userState.logged
    
    return ( 
        <div id="body">
            {logged?<div>tutaj będę dokonywał transakcji</div>:
            <div id="pageMsg">You need to log in</div>}

        </div>
     );
}
 
export default withRouter(Payment);