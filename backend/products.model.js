const mongoose=require("mongoose")

const Schema=mongoose.Schema

const ProductSchema=new Schema({
    name: {type: String, required:true},
    vol: {type:Number, required:true, min: 1},
    description:{type: String, required:true, maxlength:50},
    category: {type: String, required:true},
    keywords: {type:Array},
    links: {type: Array, maxlength:3},
    price: {type: Number},
    owner: {type:String, required: true}
}, {collection: "products"})

const Product=mongoose.model("products", ProductSchema, "products")
module.exports=Product