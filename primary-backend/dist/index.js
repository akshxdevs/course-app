"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const user_1 = require("./routes/user");
const admin_1 = require("./routes/admin");
const course_1 = require("./routes/course");
const payment_1 = require("./routes/payment");
const cert_1 = require("./routes/cert");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/admin", admin_1.adminRouter);
app.use("/api/v1/course", course_1.courseRouter);
app.use("/api/v1/payment", payment_1.paymentRouter);
app.use("/api/v1/certification", cert_1.certRouter);
app.listen(config_1.PORT, () => {
    console.log(`server running on ${config_1.PORT}`);
});
