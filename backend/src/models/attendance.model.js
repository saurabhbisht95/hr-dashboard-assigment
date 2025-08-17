import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: Date, default: () => new Date().toISOString().split("T")[0] },
  status: { type: String, enum: ["Present", "Absent"], default: "Present"},
}, { timestamps: true });

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
