import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveDate: { type: Date, required: true },
  reason: { type: String, required: true },
  document: { type: String }, 
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Leave", leaveSchema);
