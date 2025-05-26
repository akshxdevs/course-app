import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 3000
export const ADMIN_JWT = process.env.ADMIN_JWT || "aefaldfjkadsk"
export const USER_JWT = process.env.USER_JWT|| "aefaldfjkadsk"
