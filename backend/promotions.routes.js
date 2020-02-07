const PromotionsRouter=require("express").Router()
const Promotions=require("./promotions.model")


PromotionsRouter.route("/").get((req,res)=>{
    Promotions.find()
    .then(products=>res.json(products))
    .catch(err=>res.send(err))
})


module.exports=PromotionsRouter