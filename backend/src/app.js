import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use("/uploads", express.static("public/uploads"));

app.use(cookieParser())

//routes import 
import userRouter from "./routes/user.routes.js"
import candidateRouter from "./routes/candidate.routes.js";
import employeeRouter from "./routes/employee.routes.js"
import attendanceRouter from "./routes/attendance.routes.js"
import leaveRouter from "./routes/leave.routes.js"
//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/candidates", candidateRouter);
app.use("/api/v1/employees", employeeRouter)
app.use("/api/v1/attendance", attendanceRouter)
app.use("/api/v1/leave",leaveRouter)

export {app}