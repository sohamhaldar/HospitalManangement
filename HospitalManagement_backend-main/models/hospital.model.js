import mongoose,{Schema} from "mongoose";

const HospitalSchema=Schema(
    {
        HospitalBeds:{
            type:Number,
            required:true
        },
        AdmittedPatientsNo:{
            type:Number,
            required:true
        },
        AdmittedPatients:[{
            patient:{
                type:String,
                required:true
            },
            doctor:{
                type:String,
                required:true
            },
            disease:{
                type:String,
                required:true
            }
        }],
        medicines:[{
            name:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }]

    },{
    timestamps:true
    }
)

export const Hospital=mongoose.model("Hospital",HospitalSchema);