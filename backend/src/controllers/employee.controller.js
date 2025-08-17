import Employee from "../models/employee.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getEmployee = asyncHandler(async (req, res) =>{
    const employee = await Employee.find({}).sort({createdAt: -1})

    if (!employee || employee.length === 0) {
    throw new ApiError(404, "No Employee found");
  }

    return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee fetched successfully"));
})

const getEmployeeDetail = asyncHandler(async (req, res) =>{

  const {id} = req.params;

    const employee = await Employee.findById(id)

    if (!employee || employee.length === 0) {
    throw new ApiError(404, "No Employee found");
  }

    return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee fetched successfully"));
})

const updateEmployeeDetails = asyncHandler(async (req, res) =>{

    const { id } = req.params;

  const {
    fullname,
    email,
    phone,
    position,
    department,
    dateOfJoining,
    experience,
    resume,
    status
  } = req.body;

  // Find employee by ID
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new ApiError(404, "No Employee found with this ID");
  }

  if (fullname !== undefined) employee.fullname = fullname;
  if (email !== undefined) employee.email = email;
  if (phone !== undefined) employee.phone = phone;
  if (position !== undefined) employee.position = position;
  if (department !== undefined) employee.department = department;
  if (dateOfJoining !== undefined) employee.dateOfJoining = dateOfJoining;
  if (experience !== undefined) employee.experience = experience;
  if (resume !== undefined) employee.resume = resume;
  if (status !== undefined) employee.status = status;

  await employee.save();

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee updated successfully"));
});






export {getEmployee, getEmployeeDetail, updateEmployeeDetails}