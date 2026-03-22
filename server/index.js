import "dotenv/config"
import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { razorpayWebhook } from "./controllers/razorpayWebhook.controller.js"
import { verifyPayment } from "./controllers/verifyPayment.controller.js"

const app=express()

app.post(
  "/api/razorpay/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
)
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    credentials:true
}))
app.post("/api/verify-payment", verifyPayment)
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)


app.listen(port,()=>{
    console.log("server started")
    connectDb()
})