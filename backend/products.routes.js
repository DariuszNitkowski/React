const ProductRouter=require("express").Router()
let Product=require("./products.model")

ProductRouter.route("/:search").get((req,res)=>{
    Product.find({keyword: req.params.search})
    .then(product=>res.json(product))
    .catch(err=>res.json(err))
})



ProductRouter.route("/add").post((req,res)=>{
    
    let {name, vol, description, keywords, price, owner}=req.body
    let newProduct=new Product({name, vol, description, keywords, price, owner})
    console.log(newProduct)
    newProduct.save()
    .then(()=>console.log(res))
    .catch((err)=>res.json(err))
})

ProductRouter.route("/").get((req,res)=>{
    Product.find()
    .then(products=>res.send(products))
    .catch(err=>res.json(err))
})


module.exports=ProductRouter

