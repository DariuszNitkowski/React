import React from 'react';
import {withRouter} from "react-router"


const Payment = (match) => {
    
    console.log(match)
    
    return ( 
        <div className="body">
            tutaj będę dokonywał transakcji

        </div>
     );
}
 
export default withRouter(Payment);