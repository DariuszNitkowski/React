const UserRouter=require("express").Router()
let User=require("./user.model")

UserRouter.route("/:email").get((req,res)=>{
    let query=User.find()
    query.collection(User.collection)
    query.where({email: req.params.email})

    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})


UserRouter.route("/add").post((req,res)=>{
    let {name, password, email} = req.body
    let shoppingList=[]
    let own=[]
    const newUser=new User({email, name, password ,shoppingList, own})
    newUser.save()
    .then(()=>res.json("user added"))
    .catch((err)=>res.json("cant add this user"))
})

UserRouter.route("/updateShopList").post((req,res)=>{
    User.findOneAndUpdate({email: req.body.user}, {$set:{shoppingList:req.body.shopList}}, (err, doc)=>{
        if (err) console.log("coś nie halo")
        else res.send(doc)})})
    
    

module.exports=UserRouter