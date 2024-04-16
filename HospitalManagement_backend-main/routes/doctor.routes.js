import {Router} from "express";
import { getDoctors,getAppointments,getPatientHistory,completeAppointment,AdmitPatient} from "../controllers/doctor.controller.js";
import { getMedicines,Addmedicines } from "../controllers/staff.controller.js";


const router=Router();
router.route("/getDoctors").get(getDoctors);
router.route("/getAppointments").post(getAppointments);
router.route("/getPatientHistory").post(getPatientHistory);
router.route("/completeAppointment").post(completeAppointment);
router.route("/admitPatient").post(AdmitPatient);
router.route("/getMedicines").post(getMedicines);
router.route("/addMedicines").post(Addmedicines);


export default router;