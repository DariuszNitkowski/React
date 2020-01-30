import React, { useState, useEffect, forceUpdate} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom"
import {withRouter} from "react-router"
import axios from "axios"
const validator=require("email-validator")


const LoginBody = (match) => {
    
    const [logMessage, setLogMessage]=useState([])

    const handleLogin=(e)=>{
        e.preventDefault()
        let formData=document.forms["logForm"]
        let email=formData["email"].value
        let password=formData["pass"].value
        let logErrMessage=[]
        if (!validator.validate(email)) {
            logErrMessage.push("Wrong email adress")
            formData["email"].value=""}
        if (password.length<6){
            logErrMessage.push("Password given is too short")
            formData["pass"].value=""}
        if (logErrMessage.length>0) setLogMessage(logErrMessage)
        else{
            axios
            .get(`http://localhost:5000/${email}`)
            .then(res=>{
                if (res.data.length===0) setLogMessage([`email: ${email} is not registred`])
                else {
                    let mongoData=res.data[0]
                    if (mongoData.password!==password) {
                        setLogMessage(["Wrong password"])
                        formData["pass"].value=""}
                    else{
                        match.setUserState({
                            logged: true,
                            isLogin: false,
                            email: email,
                            userName: mongoData.name,
                            shoppingList: "",
                            message: ""
                        })

                        match.history.push({pathname:"/"})}
                    }
                })}}
            
        
    

    
    
    console.log("w login body")
    return ( 
        <div className="body">
            <form name="logForm" onSubmit={handleLogin}>
                <div>email<input type="text" name="email"/></div>
            <div>password<input type="text" name="pass"/></div>
            <div><button type="submit">Login</button></div>
            </form>
            <div>{logMessage}</div>
        
            <div><Link to="/create">Utwórz konto</Link></div>
            
       
        </div>
     );
}
 
export default withRouter(LoginBody);