import { Router } from "express";
import { SignUp ,Login} from "../controllers/patient.controller.js";

const router=Router();

router.route("/register").post(SignUp);
router.route("/login").post(Login)

export default router;
