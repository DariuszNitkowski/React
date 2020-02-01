const mongoose=require("mongoose")

const Schema=mongoose.Schema

const ProductSchema=new Schema({
    name: {type: String, required:true},
    vol: {type:Number, required:true},
    description:{type: String, required:true, minlength:10, maxlength:50},
    category: {type: String, required:true},
    keywords: {type:Array},
    // image:{type: },
    price: {type: Number},
    owner: {type:String, required: true}
},{collection: "products"})

const Product=mongoose.model("products", ProductSchema)
module.exports=Product