import { Router } from "express";
import { prismaClient } from "../db/db";
import jwt from "jsonwebtoken";
import { USER_JWT } from "../config";
import { userAuthenticate } from "../middleware/middleware";
const router = Router();


export const paymentRouter = router;