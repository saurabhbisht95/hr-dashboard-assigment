import { Router } from "express";
import { addCandidate, getCandidates, updateCandidateStatus } from "../controllers/candidate.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middelware.js";

const router = Router();

router.post("/add",upload.single("resume"), verifyJWT, addCandidate);
router.get("/", verifyJWT, getCandidates);
router.post("/update/:id", verifyJWT, updateCandidateStatus)


export default router;