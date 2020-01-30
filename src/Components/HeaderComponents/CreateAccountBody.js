import React, {useState} from 'react';
import {withRouter} from "react-router"
import axios from "axios"
const validator=require("email-validator")

const CreateAccountBody = (props) => {
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
            .get(`http://localhost:5000/${email}`)
            .then(res=>{
                if (res.data[0].email===email) {
                    setMessage([`user ${email} already exists`])
                    formData["email"].value=""}
                else{
                    const user={
                        email: email,
                        name: userName,
                        password: password
                    }
                    axios 
                    .post("http://localhost:5000/add", user)
                    .then(()=>{
                        
                        props.history.push({pathname: "/"})})
                    .catch(err=>setMessage(["cant create user, try again"]))}})}
    }
        
        
    

    
    return ( 
        <div className="body">
            to create account please fill the form:
            <form onSubmit={addUser} id="newUserForm">
                <input type="text" name="userName" placeholder="what is your name"/>
                <input type="text" name="email" placeholder="what is your email adress"/>
                <div>Type in your new password. Must be minimum 6 characters long</div>
                <div>
                    <input type="password" name="password" placeholder="what will be your password"/></div>
                <div><input type="password" name="passwordConfirmation" placeholder="please confirm password"/></div>
                <button type="submit">Create new user</button>
                <div><ul>{message.map(err=><li key={err}>{err}</li>)}</ul></div>

            </form>
            </div>
     );
}
 
export default withRouter(CreateAccountBody);