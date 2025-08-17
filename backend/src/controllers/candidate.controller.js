import Candidate from "../models/candidate.model.js";
import Employee from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addCandidate = asyncHandler(async (req, res) => {
  const { fullname, email, phone, position, experience, resume, status } =
    req.body;
  if (
    !fullname?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !position?.trim() ||
    experience == null
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingCandidate = await Candidate.findOne({ email });
  if (existingCandidate) {
    throw new ApiError(400, "Candidate with this email already exists");
  }
  if (!req.file && !resume?.trim()) {
    throw new ApiError(400, "Resume is required");
  }

  let resumePath = "";
  if (req.file) {
    resumePath = `/uploads/${req.file.filename}`;
  } else if (resume) {
    resumePath = resume;
  }

  const candidate = await Candidate.create({
    fullname,
    email,
    phone,
    position,
    experience,
    resume: resumePath,
    status: status || "new",
  });

  if (!candidate) {
    throw new ApiError(500, "Something went wrong while saving candidate");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, candidate, "Candidate added successfully"));
});

const getCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find({}).sort({ createdAt: -1 });

  if (!candidates || candidates.length === 0) {
    throw new ApiError(404, "No candidates found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, candidates, "Candidates fetched successfully"));
});

const updateCandidateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const candidate = await Candidate.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!candidate) {
    throw new ApiError(404, "Candidate not found");
  }

  if (status === "Selected") {
    await Employee.create({
      fullname: candidate.fullname,
      email: candidate.email,
      phone: candidate.phone,
      department: candidate.position.split(" ")[0],
      position:
        candidate.position.split(" ").slice(1).join(" ") || candidate.position,
      dateOfJoining: new Date(),
    });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, Employee, "Employee added successfully"));
});

export { addCandidate, getCandidates, updateCandidateStatus };
