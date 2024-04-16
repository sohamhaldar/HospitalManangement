import mongoose,{ Schema,model } from "mongoose";
import Jwt from "jsonwebtoken";

const patientSchema=Schema(
    {
        age:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }    
    },
{
    timeStamps:true
}
);
patientSchema.methods.generateAccessToken=function(){
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username:this.username
        },process.env.SECRET_TOKEN,
        {
            expiresIn:process.env.SECRET_TOKEN_EXPIRY_TIME
        }
    )
};
export const Patient=mongoose.model("Patient",patientSchema);