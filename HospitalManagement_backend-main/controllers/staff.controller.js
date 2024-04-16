import { ApiError } from "../utils/ApiError.js";
import { Hospital } from "../models/hospital.model.js";

const getHospitalStatus=async(req,res,next)=>{
    try{
        const hospital=await Hospital.find();
        if(hospital=={}){
            console.log("making hospital");
            const hospital=await Hospital.create({
                HospitalBeds:1000,
                AdmittedPatientsNo:0
            });
            const createdHospital=await Hospital.findById(hospital._id);
            if(!createdHospital){
                throw new ApiError(500,"Some error occured please try again");
            }
        }
        res.status(200).json({
            status:true,
            data:hospital
        })
    }catch(error){
        next(error);
    }
}

const Addmedicines=async(req,res,next)=>{
    try{
        const {name,price,quantity}=req.body;
        const hospital=await Hospital.find();
        if(hospital=={}){
            console.log("making hospital");
            const hospital=await Hospital.create({
                HospitalBeds:1000,
                AdmittedPatientsNo:0
            });
            const createdHospital=await Hospital.findById(hospital._id);
            if(!createdHospital){
                throw new ApiError(500,"Some error occured please try again");
            }
        }
        // medicine=await hospital[0].medicines.some(e => e.name == name);
        if(!await hospital[0].medicines.some(e => e.name == name)){
            await Hospital.findOneAndUpdate({},{
                $push:{
                    medicines:{
                        name:name,
                        price:price,
                        quantity:quantity
                    }
                
                }
            })
        }
        else{
            await Hospital.updateOne({"medicines.name":name},{
                $inc:{
                    "medicines.$.quantity":quantity
                }
            })
        };
        res.status(200).json({
            status:true,
            data:"medicines updated succesfully"
        });

        
    }catch(error){
        next(error);
    }
}
const getMedicines=async(req,res,next)=>{
    try{
        const hospital=await Hospital.find();
        if(hospital=={}){
            console.log("making hospital");
            const hospital=await Hospital.create({
                HospitalBeds:1000,
                AdmittedPatientsNo:0
            });
            const createdHospital=await Hospital.findById(hospital._id);
            if(!createdHospital){
                throw new ApiError(500,"Some error occured please try again");
            }
        }
        const medicines=hospital[0].medicines
        res.status(200).json({
            status:true,
            data:medicines
        })
    }catch(error){
        next(error);
    }
}

export {getMedicines,Addmedicines}