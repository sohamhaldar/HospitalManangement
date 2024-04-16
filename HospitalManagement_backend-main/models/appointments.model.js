import mongoose,{Schema} from "mongoose";

const AppointmentSchema=Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    doctor_name:{
        type:String,
        required:true
    },
    patient_name:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"    
    }
},{timeStamps:true});

export const Appointments=mongoose.model("Appointments",AppointmentSchema);
