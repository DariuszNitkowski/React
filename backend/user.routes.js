const UserRouter=require("express").Router()
let User=require("./user.model")

UserRouter.route("/:email").get((req,res)=>{
    let query=User.find()
    query.collection(User.collection)
    query.where({email: req.params.email})

    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})



UserRouter.route("/").get((req,res)=>{
    User.find()

    .then(user=>res.send(user))
    .catch(err=>res.json(err))
})

UserRouter.route("/add").post((req,res)=>{
    let name = req.body.name
    let password=req.body.password
    let email = req.body.email
    const newUser=new User({email, name, password})
    newUser.save()
    .then(()=>res.json("user added"))
    .catch((err)=>res.json("cant add this user"))





})

module.exports=UserRouter