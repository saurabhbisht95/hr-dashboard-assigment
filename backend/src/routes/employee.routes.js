import { getEmployee, getEmployeeDetail, updateEmployeeDetails } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", verifyJWT, getEmployee);
router.get("/:id", verifyJWT, getEmployeeDetail);
router.post("/update/:id", verifyJWT, updateEmployeeDetails);

export default router;
