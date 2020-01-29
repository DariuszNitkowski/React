import React from 'react';
import {withRouter} from "react-router"

const CreateAccountBody = () => {
    
    console.log("w create account body")
    return ( 
        <div className="body">
            to create account please fill the form:
            <form>
                <input type="text" placeholder="what is your name"/>
                <input type="text" placeholder="what is your email adress"/>
                <div>Type in your new password. Must be minimum 6 characters long</div>
                <div>
                    <input type="text" placeholder="what will be your password"/></div>
                <div><input type="text" placeholder="please confirm password"/></div>
                <button type="submit">Create new user</button>

            </form>
            </div>
     );
}
 
export default withRouter(CreateAccountBody);