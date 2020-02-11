import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from "axios"
const validator=require("email-validator")

const CreateAccountBody = (match) => {
    const [message, setMessage]=useState([])
    const addUser=(e)=>{
        e.preventDefault()
        let formData=document.forms["newUserForm"]
        let userName=formData["userName"].value
        let email=formData["email"].value
        let password=formData["password"].value
        let passwordConfirmation=formData["passwordConfirmation"].value
        let errMessage=[]
        if (password!==passwordConfirmation) {
            errMessage.push("Password confirmation doesnt match")
            formData["password"].value=""
            formData["passwordConfirmation"].value=""}
        if (password.length<6) {
            errMessage.push("Password must be minimum 6 characters long")
            formData["password"].value=""
            formData["passwordConfirmation"].value=""}

        if (!validator.validate(email)) errMessage.push("Wrong email adress")
        if (userName.length===0 || email.length===0 || password.length===0 || passwordConfirmation.length===0){
            errMessage.push("Fill all fields")}
        
        if (errMessage.length>0) setMessage(errMessage)
        else{
            axios
            .get(`http://localhost:5000/user/${email}`)
            .then(res=>{
                if (res.data.length!==0) {
                    setMessage([`user ${email} already exists`])
                    formData["email"].value=""}
                else{
                    const user={
                        email: email,
                        name: userName,
                        password: password
                    }
                    axios 
                    .post("http://localhost:5000/user/add", user)
                    .then(()=>{
                        setMessage(["User created, please login"])
                        setTimeout(()=>match.history.push({pathname: "/"}), 5000)})
                    .catch(err=>setMessage(["cant create user, try again"]))}})}
    }
        
        
    

    
    return ( <>
        <div id="userMsg"><ul>{message.map(err=><li key={err}>{err}</li>)}</ul></div>
        <div id="body">
            {match.userState.logged?<div id="pageMsg"> to create account please log out</div> :
            <>
            <div id="pageMsg">to create account please fill the form</div>
            <form onSubmit={addUser} id="newUserForm">
                <input type="text" name="userName" id="newName" placeholder="nickname max 16 characters" maxLength={16}/>
                <input type="text" name="email" id="newEmail" placeholder="what is your email adress"/>
                <div id="newInfo">Type in your new password. Must be minimum 6 characters long</div>
                <div id="newPass">
                    <input type="password" name="password" placeholder="what will be your password"/></div>
                <div id="newPassConf"><input type="password" name="passwordConfirmation" placeholder="please confirm password"/></div>
                <button type="submit">Create new user</button>
                

            </form></>}
            </div>
            </>
     );
}
 
export default withRouter(CreateAccountBody);