import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  dateOfJoining: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
