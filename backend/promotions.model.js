const mongoose=require("mongoose")

const Schema=mongoose.Schema

const PromotionsSchema= new Schema({
    productId: {type:String, required:true},
    text: {type: String, required: true}
}, {collection: "promotions"})

const Promotions=mongoose.model("promotions", PromotionsSchema, "promotions")

module.exports=Promotions