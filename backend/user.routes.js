const Router=require("express").Router()
let User=require("./user.model")

Router.route("/:email").get((req,res)=>{
    console.log(req.params.email)
    User.find({email: req.params.email})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})



Router.route("/").get((req,res)=>{
    User.find()

    .then(user=>res.send(user))
    .catch(err=>res.json(err))
})

Router.route("/add").post((req,res)=>{
    let name = req.body.name
    let password=req.body.password
    let email = req.body.email
    const newUser=new User({email, name, password})
    newUser.save()
    .then(()=>res.json("user added"))
    .catch((err)=>res.json("cant add this user"))





})

module.exports=Router