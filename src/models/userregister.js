const mongoose=require("mongoose")
const newcustomer= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        raequired:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Register",newcustomer)
module.exports= Register;
