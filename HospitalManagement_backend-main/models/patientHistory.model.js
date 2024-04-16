import mongoose,{Schema} from "mongoose";

const patientHistorySchema=Schema({
    doctor_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    patient:{
        type:String,
        required:true
    },
    patient_name:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    prescription:[{
        type:String
    }],
    bill:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }

},{timeStamps:true})
export const PatientHistory=mongoose.model("PatientHistory",patientHistorySchema);