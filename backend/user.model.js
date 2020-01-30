const mongoose=require("mongoose");

const Schema=mongoose.Schema

const UserSchema=new Schema({
    email: {type: String, required: true, unique:true},
    name: {type: String, required: true, maxlength: 16},
    password: {type: String, minlength:6, required: true}
})


const User=mongoose.model("user", UserSchema);
module.exports=User