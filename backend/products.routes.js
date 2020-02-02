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
    .then(()=>res.send())
    .catch((err)=>res.json(err))
})

ProductRouter.route("/").get((req,res)=>{
    Product.find()
    .then(products=>res.send(products))
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




module.exports=ProductRouter

