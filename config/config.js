import dotenv from 'dotenv'
dotenv.config()
export const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  SERVER_URL,
} = process.env