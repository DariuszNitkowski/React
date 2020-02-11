import React, { useState} from 'react';
import { Link} from "react-router-dom"
import {withRouter} from "react-router"
import axios from "axios"
const validator=require("email-validator")


const LoginBody = (match) => {
    
    const [logMessage, setLogMessage]=useState([])
    const logged=match.userState.logged
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
            .get(`http://localhost:5000/user/${email}`)
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
                            shoppingList: mongoData.shoppingList,
                            own: mongoData.own
                        })

                        match.history.push({pathname:"/"})}
                    }
                })}}
            
        
    

    
    
    return ( <>
        <div id="body">
        <div id="userMsg">{logMessage}</div>
            {logged?<div id="pageMsg">You are logged already</div>:
            <div id="loginArea">
            <form name="logForm" onSubmit={handleLogin}>
                <div id="loginEmail">email<input type="text" name="email"/></div>
            <div id="loginPass">password<input type="text" name="pass"/></div>
            <div id="loginBtn"><button type="submit">Login</button></div>
            </form>
            
        
            <div id="newAccount"><Link to="/create">Press here to create new account</Link></div>
            </div>}
        </div></>
     );
}
 
export default withRouter(LoginBody);