import mongoose,{Schema} from "mongoose";

const HelpSchema=Schema(
    {
        doctor:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        // appointments:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"Appointments",
        // }],
        patientHistory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"PatientHistory"
        }
    }
);

export const DoctorHelp=mongoose.model("DoctorHelp",HelpSchema);