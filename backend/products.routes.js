const ProductRouter=require("express").Router()
let Product=require("./products.model")

ProductRouter.route("/:search").get((req,res)=>{
    Product.find({keyword: req.params.search})
    .then(product=>res.json(product))
    .catch(err=>res.json(err))
})



ProductRouter.route("/add").post((req,res)=>{
    
    let {name, vol, description, category, keywords, price, owner}=req.body
    const newProduct=new Product({name, vol, description, category, keywords, price, owner})
    newProduct.save()
    .then(()=>res.send())
    .catch((err)=>res.json(err))
})

ProductRouter.route("/").get((req,res)=>{
    Product.find()
    .then(products=>res.send(products))
    .catch(err=>res.json(err))
})


module.exports=ProductRouter

