import Leave from "../models/leave.model.js"
import Employee from "../models/employee.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addLeave = asyncHandler(async (req, res) => {
    const {employeeId} = req.params;
  const {  leaveDate, reason } = req.body;
  console.log(employeeId)

  if (!employeeId || !leaveDate || !reason) {
    throw new ApiError(400, "Employee, Leave Date and Reason are required");
  }

  let documentPath = "";
  if (req.file) {
    documentPath = `/uploads/${req.file.filename}`; 
  }

  const newLeave = await Leave.create({
    employee: employeeId,
    leaveDate,
    reason,
    document: documentPath,
    status: "pending",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newLeave, "Leave added successfully"));
});



const getLeaves = asyncHandler (async(req, res) => {
    const leaves = await Leave.find({})
    .populate("employee", "fullname email position department")
    .sort({createdAt: -1})

    return res
    .status(200)
    .json(new ApiResponse(200, leaves, "Leave Fetched successfully"));

})

const updateLeaveStatus = asyncHandler(async(req,res) =>{
    const { leaveId } = req.params;

    const { status } = req.body; 

    const leaveRecord = await Leave.findOne({leaveId})

    if(!leaveRecord){
        throw new ApiError(400, "No Leave record found")
    }
    
    leaveRecord.status = status;
    await leaveRecord.save()

    return res
    .status(200)
    .json(new ApiResponse(200, leaveRecord, "Leave Status updated successfully"));

})


export {addLeave, getLeaves, updateLeaveStatus}