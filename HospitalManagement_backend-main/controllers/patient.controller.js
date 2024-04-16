import { ApiError } from "../utils/ApiError.js";
import { Patient } from "../models/patient.model.js";
import { PatientHistory } from "../models/patientHistory.model.js";
// import { Patientappointments } from "../models/patientappointments.model.js";
import  {Appointments}  from "../models/appointments.model.js";
const SignUp=async(req,res,next)=>{
    try{
        // console.log(req.body);
        const {username,email,password,age}=req.body;
        if([username,email,password,age].some((parameters)=>parameters?.trim()==="")){
            throw new ApiError(400,"All fields are required");
        }
        const existedUser=await Patient.findOne({$or:[{username},{email}]});
        if(existedUser){
            throw new ApiError(409,"Email or username already exists");
        }
        const patient=await Patient.create({
            age,
            email,
            password,
            username
        })

        const createdPatient=await Patient.findById(patient._id).select(
            "-password"
        );
        if(!createdPatient){
            throw new ApiError(500,"Some Error occured please try Again");
        }
        res.status(200).json({
            status:true,
            message:"user created succesfully"
        });
    }catch (err) {
        next(err);
    }
}

const Login=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user=await Patient.findOne({email,password});
        console.log(user);

        if(!user){
            throw new ApiError(401,"Email or password is incorrect");
        }
        const token=await user.generateAccessToken();
        res.status(200).json({
            status:true,
            message:"Succesful login",
            token:token 
        })    
    }catch (err) {
        next(err);
    }
}

const AddApointment=async(req,res,next)=>{
    try{
        const {patient,doctor,time,doctor_name,patient_name}=req.body;
        if([patient,doctor,time].some((parameters)=>parameters?.trim()==="")){
            throw new ApiError(500,"Some Error occured in sending appointment request");
        }
        const appointment= await Appointments.create({
            doctor,
            time,
            patient,
            doctor_name,
            patient_name
        });
        // const getUser=await Patientappointments.findOne({patient:patient});
        const createdAppointment=await await Appointments.findById(appointment._id);
        if(!createdAppointment){
            throw new ApiError(500,"Some Error occured please try Again");
        }

        // const appointment=await Patientappointments.create({
        //     patient,
        //     doctor_name,
        //     time
        // })
        // const createdAppointment=await Appointments.findById(appointment._id);
        // if(!createdAppointment){
        //     throw new ApiError(500,"Some Error occured please try Again");
        // }

        res.status(201).json({
            status:true,
            message:"Appointment taken successfuly"
        })
    
    }catch (error){
        next(error);
    }
}

const getAppointments=async(req,res,next)=>{
    try{
        const {patient}=req.body;
        const appointments=await Appointments.find({patient:patient,status:"pending"});
        res.status(200).json({
            status:true,
            data:appointments
        })        
    }catch(error){
       next(error); 
    }
}
const cancelAppointment=async(req,res,next)=>{
    try{
        const {appointment}=req.body;
        const data=await Appointments.deleteOne({_id:appointment});
        res.status(200).json({
            status:true,
            data:"Appointment cancelled"
        })
        
    }catch(error){
       next(error); 
    }
}



export {SignUp,Login,getAppointments,AddApointment,cancelAppointment}
