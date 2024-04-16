import { Router } from "express";
import {getAppointments,AddApointment,cancelAppointment} from "../controllers/patient.controller.js";

const router=Router();
router.route("/getAppointment").post(getAppointments);
router.route("/addAppointment").post(AddApointment);
router.route("/cancelAppointment").post(cancelAppointment);

export default router;