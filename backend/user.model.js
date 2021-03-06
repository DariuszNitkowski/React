const mongoose=require("mongoose");

const Schema=mongoose.Schema

const UserSchema=new Schema({
    email: {type: String, required: true, unique:true},
    name: {type: String, required: true, maxlength: 16},
    password: {type: String, minlength:6, required: true},
    shoppingList: {type: Array},
    
}, {collection: "users"})


const User=mongoose.model("users", UserSchema, "users");
module.exports=User