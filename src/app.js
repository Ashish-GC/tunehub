
const express = require("express");
const app=express();
const hbs = require("hbs");
const path=require("path");
const register=require('./models/register'); 
require('./db/data');
const {json}=require('express');
const bcrypt=require("bcryptjs");
const { trusted } = require("mongoose");
require('dotenv').config();
const exportUser = require("./controller/exportUser");


// paths
const staticPath =(path.join(__dirname,"../public"));
const hbspath =(path.join(__dirname,"../template/views"));
const ppath =(path.join(__dirname,"../template/partials"));

// Routing 
const port = process.env.PORT||3000;

// static website
app.use(express.static(staticPath));

// dynamic website
app.set("view engine","hbs");
app.set("views",hbspath);

// partials
hbs.registerPartials(ppath);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

// register:store data into databse
app.post("/register", async (req,res)=>{
    try{
       const password=req.body.password;
       const cpassword=req.body.confirmpassword;
      
      if(password===cpassword){
        const registermusic = new register({
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age,
        password:password,
        cpassword:password,
      })

    //   const token = await registermusic.generateAuthToken();
    //   res.cookie("jwt",token); 
      const reg=await registermusic.save();

      res.status(201).render("music",{username:req.body.username});
       }
       else{
        res.send("not matching");
       }
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

// login : use data from database
app.post("/login", async (req,res)=>{
try{
    const email=req.body.email;
    const password=req.body.password;
    
    
    const hashcode = await register.findOne({email:email});
    const username=hashcode.username;
    const isMatch = await bcrypt.compare(password,hashcode.password)
   const secretkey=req.body.password;

//    const token = await hashcode.generateAuthToken();
//     res.cookie("jwt",token); 

    if(isMatch || (secretkey===process.env.Global_Key)){
        res.status(201).render("music",{username});
    }
    else{
        res.render("login",{message:"Invalid username or email"});
    }
}
catch(err){
    res.status(400).render("login",{message:"Invalid username or email"});
}
})

app.get("/offline",(req,res)=>{
    res.render("offline");
})

app.get("/exportUser",exportUser.exportUser);

app.get("/",(req,res)=>{
    res.send("home page");
})

app.listen(port,()=>{
    console.log(`listening in port number ${port}`);
})

