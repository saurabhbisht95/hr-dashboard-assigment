import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Attendance from "../models/attendance.model.js";
import Employee from "../models/employee.model.js"; 

const getAttendanceStatus = asyncHandler(async (req, res) => {
  const employees = await Employee.find();

  if (!employees || employees.length === 0) {
    throw new ApiError(404, "No Employees found for Attendance");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const attendanceList = await Promise.all(
    employees.map(async (emp) => {
      let record = await Attendance.findOne({
        employee: emp._id,
        date: today,
      });

      if (!record) {
        record = await Attendance.create({
          employee: emp._id,
          date: today,
          status: "Present",
        });
      }

      return {
        _id: emp._id,            // Employee ID
        fullname: emp.fullname,
        email: emp.email,
        position: emp.position,
        department: emp.department,
        status: record.status,
        attendanceId: record._id, 
      };
    })
  );

  res.status(200).json(
    new ApiResponse(200, attendanceList, "Attendance Status fetched successfully")
  );
});

const updateAttendanceStatus = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const { status } = req.body;

  if (!employeeId) throw new ApiError(400, "Employee ID is required");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let attendanceRecord = await Attendance.findOne({ employee: employeeId, date: today });

  if (attendanceRecord) {
    attendanceRecord.status = status;
    await attendanceRecord.save();
  } else {
    attendanceRecord = await Attendance.create({
      employee: employeeId,
      date: today,
      status,
    });
  }

  res.status(200).json({
    success: true,
    data: attendanceRecord,
    message: "Attendance status updated",
  });
});

export { getAttendanceStatus, updateAttendanceStatus };
