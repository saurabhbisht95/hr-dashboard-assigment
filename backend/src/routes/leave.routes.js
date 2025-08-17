import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addLeave, getLeaves, updateLeaveStatus } from "../controllers/leave.controller.js";
import { upload } from "../middlewares/multer.middelware.js";

const router = Router() 

router.get("/",verifyJWT, getLeaves); 
router.post("/add/:employeeId",upload.single("document"),verifyJWT, addLeave);
router.put("/update/:id", verifyJWT, updateLeaveStatus)

export default router;
