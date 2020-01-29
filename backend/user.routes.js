const Router=require("express").Router()
let User=require("./user.model")

Router.route("/:id").get((req,res)=>{
    User.findbyId(req.params.id)
    .then(trade=>res.json(trade))
    .catch(err=>res.json(err))})


Router.route("/add").post((req,res)=>{
    let _id = req.body._id
    let password=req.body.password
    const newUser=new User({_id, password})
    newUser.save()
    .then(()=>res.json("user added"))
    .catch(()=>res.json("cant add this user"))
})

module.exports=Router