import mongoose,{Schema} from "mongoose";
import Jwt from "jsonwebtoken";
const DoctorSchema=Schema(
    {
        fullName:{
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
        },
        speciality:{
            type:String,
            required:true
        },
        fees:{
            type:String,
            required:true
        } 
    },
    {
        timeStamps:true
    }
);

DoctorSchema.methods.generateAccessToken=function(){
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fees:this.fees
        },process.env.SECRET_TOKEN,
        {
            expiresIn:process.env.SECRET_TOKEN_EXPIRY_TIME
        }
    )
};


export const Doctor=mongoose.model("Doctor",DoctorSchema);