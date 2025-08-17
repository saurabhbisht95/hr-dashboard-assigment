import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAttendanceStatus, updateAttendanceStatus } from "../controllers/attendance.controller.js";
const router = Router();

router.get("/",verifyJWT, getAttendanceStatus); 
router.put("/:employeeId",verifyJWT, updateAttendanceStatus);

export default router;
