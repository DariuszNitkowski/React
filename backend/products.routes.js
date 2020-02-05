const ProductRouter=require("express").Router()
let Product=require("./products.model")

ProductRouter.route("/search/:search").get((req,res)=>{
    let query=req.params.search
    let field=query.slice(0,query.indexOf(":"))
    let value=query.slice(query.indexOf(":")+1)
    Product.find({field: {$regex: value, $options: "i"}}, (err, doc)=>{
        if (err) console.log("something wrong")
        else res.send(doc)})
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

ProductRouter.route("/edit").post((req, res)=>{
    let {id, name, vol, description, category, keywords, price}=req.body
    Product.findByIdAndUpdate(id, {name: name, vol:vol, description: description, category: category, keywords: keywords,
        price:price}, (err, doc)=>{
            if (err) console.log("coś nie halo w updejcie produktu")
            else res.json(doc)})})

ProductRouter.route("/changevol").post((req,res)=>{
    let {id, vol}=req.body
    Product.findByIdAndUpdate(id, {$inc : {vol: vol}}, (err, doc)=>{
        if (err) console.log("something wrong")
        else res.json(doc)
    })
})
        


ProductRouter.route("/list/:email").get((req,res)=>{
    
    Product.find({owner:req.params.email})
    .then(products=>res.send(products))
    .catch(err=>res.send(err))
})



module.exports=ProductRouter

