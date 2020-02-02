const ProductRouter=require("express").Router()
let Product=require("./products.model")

ProductRouter.route("/:search").get((req,res)=>{
    Product.find({keywords: req.params.search})
    .then(product=>res.json(product))
    .catch(err=>res.json(err))
})



ProductRouter.route("/add").post((req,res)=>{
    
    let {name, vol, description, category, keywords, price, owner}=req.body
    const newProduct=new Product({name, vol, description, category, keywords, price, owner})
    newProduct.save()
    .then((product)=>res.send(product))
    .catch((err)=>res.json(err))
})

ProductRouter.route("/").get((req,res)=>{
    Product.find()
    .then(product=>res.send(product))
    .catch(err=>res.json(err))
})

ProductRouter.route("/delete/:id").delete((req, res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(res=>res.send())
    .catch(err=>res.send(err))
})

ProductRouter.route("/update/:id").post((req, res)=>{
    Product.findById(req.params.id)
    .then(product=>{
        let {name, vol, description, category, keywords, price}=req.body
        product.name=name
        product.vol=vol
        product.description=description
        product.category=category
        let newKeywords=[]
        newKeywords.push(name, description, category)
        product.keywords=newKeywords
        product.price=price
        product.save()
        .then(res=>send.json(res))
        .catch(err=>res.send(err))
    })
    .catch(err=>send.json(err))
})

ProductRouter.route("/list/:adres").get((req, res)=>{
    Product.find({ owner: { $in: req.params.adres}})
    
    // query.where({_id: req.body.own})
    // Product.find({_id: "5e36c261fe0f840a44f7a9b8"})
        // { $in: ["5e36c261fe0f840a44f7a9b8", "5e36c76986669f0cWW98964b8f"]} })
    .then(product=>res.send(product))
    .catch(err=>res.json(err))

    

})




module.exports=ProductRouter

