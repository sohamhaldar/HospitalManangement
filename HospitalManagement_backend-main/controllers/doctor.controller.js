import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { DoctorHelp } from "../models/doctorHelp.model.js";
import  {Appointments}  from "../models/appointments.model.js";
import { PatientHistory } from "../models/patientHistory.model.js";
import { Hospital } from "../models/hospital.model.js";
import { Patient } from "../models/patient.model.js";


const SignUp=async(req,res,next)=>{
    try{
        console.log(req);
        const {username,email,password,fullName,speciality,fees}=req.body;
        if([username,email,password,fullName,speciality,fees].some((parameters)=>parameters?.trim()==="")){
            throw new ApiError(400,"All fields are required");
        }
        const existedUser=await Doctor.findOne({$or:[{username},{email}]});
        if(existedUser){
            throw new ApiError(409,"Email or username already exists");
        }
        const doctor=await Doctor.create({
            fullName,
            email,
            password,
            username,
            speciality,
            fees
        });
        const createdDoctor=await Doctor.findById(doctor._id).select(
            "-password"
        );
        if(!createdDoctor){
            throw new ApiError(500,"Some Error occured please try Again");
        }
        res.status(200).json({
            status:true,
            message:"user created succesfully"
        });
        
    }catch (error){
        next(error);
    }
}

const Login=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user=await Doctor.findOne({email,password});
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
const getDoctors=async(req,res,next)=>{
    try{
        const doctors=await Doctor.find();
        res.status(200).json({
            status:true,
            data:doctors
        })
    }
    catch(err){
        next(err);
    }
}
const getAppointments=async(req,res,next)=>{
    try{
        const {doctor}=req.body;
        const appointments=await Appointments.find({doctor:doctor,status:"pending"});
        res.status(200).json({
            status:true,
            data:appointments
        })        
    }catch(error){
       next(error); 
    }
}
const getPatientHistory=async(req,res,next)=>{
    try{
        // const {patient,doctor}=req.body;
        const {doctor}=req.body;
        const doctor_patients=await PatientHistory.find({doctor_name:doctor});
        res.status(200).json({
            status:true,
            data:doctor_patients
        })    
    }catch(error){
        next(error);
    }
}
const completeAppointment=async(req,res,next)=>{
    try{
        const {patient,doctor,_id,medicine_names,medicine_price,fees}=req.body;
        const appointment=await Appointments.updateOne({_id:_id},{$set:{status:"complete"}});
        const d=await Doctor.find({_id:doctor});
        const p=await Patient.find({_id:patient});
        const p_name=p[0].username;
        const disease=d[0].speciality;
        console.log(disease);
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        const patientHistory=await PatientHistory.create({
            patient:patient,
            doctor_name:doctor,
            patient_name:p_name,
            disease:disease,
            prescription:medicine_names,
            bill:parseInt(medicine_price)+parseInt(fees),
            date:currentDate.toString()
        });
        res.status(200).json({
            status:true,
            data:"Appointment completed"
        })
    }catch(error){
        next(error);
    }
}

const AdmitPatient=async(req,res,next)=>{
    try{
        const {patient,doctor,disease}=req.body;
        const hospital=await Hospital.find();
        if(hospital=={}){
            console.log("making hospital");
            const hospital=await Hospital.create({
                HospitalBeds:1000,
                AdmittedPatientsNo:1
            });
            const createdHospital=await Hospital.findById(hospital._id);
            if(!createdHospital){
                throw new ApiError(500,"Some error occured please try again");
            }
        }
        const admit=hospital.update({},{$inc:{AdmittedPatientsNo:1}},{$push:{
            AdmittedPatients:{
                patient:patient,
                doctor:doctor,
                disease:disease
            }
        }})
        res.status(200).json({
            status:true,
            data:"Admitted succesfully"
        })
        
    }catch(error){
       next(error);   
    }
}
export {SignUp,Login,getDoctors,getAppointments,completeAppointment,getPatientHistory,AdmitPatient}