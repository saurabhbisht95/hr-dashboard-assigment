import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: Number, required: true },
  resume: { type: String, required: true },
  status: {
    type: String,
    enum: ["new","scheduled", "ongoing", "selected", "rejected"],
    default: "scheduled"
  }
}, { timestamps: true });

export default mongoose.model("Candidate", candidateSchema);
