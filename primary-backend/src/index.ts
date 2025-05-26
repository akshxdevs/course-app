import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { userRouter } from "./routes/user";
import { adminRouter } from "./routes/admin";
import { courseRouter } from "./routes/course";
import { paymentRouter } from "./routes/payment";
import { certRouter } from "./routes/cert";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/payment",paymentRouter);
app.use("/api/v1/certification",certRouter);

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});