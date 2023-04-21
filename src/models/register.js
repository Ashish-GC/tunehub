
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// define schema

const registerSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
       
      unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword :{
        type:String,
    
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})
// jwt token
// registerSchema.methods.generateAuthToken =async function(){
//     try{
//        const token = jwt.sign({_id:this._id.toString()},process.env.Secret_Key)
//          this.tokens=this.tokens.concat({token:token});
//          await this.save();
//          return token;
//     }
//     catch(err){
//         res.send(err);
//     }
// }

// Hash code

registerSchema.pre("save",async function(next){
if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
    this.confirmpassword = undefined;
}
next(); 
})

// creating collection

const Register = new mongoose.model("Register",registerSchema);

module.exports=Register;