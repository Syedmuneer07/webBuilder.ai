import crypto from "crypto"
import { PLANS } from "../config/plan.js"
import getRazorpay from "../config/razorpay.js"

export const billing = async (req, res) => {
  try {
    const { planType } = req.body
    const userId = req.user._id
    const plan = PLANS[planType]

    if (!plan || plan.price === 0) {
      return res.status(400).json({ success: false, message: "invalid paid plan" })
    }

    // Razorpay receipt max length is 40 characters
    const receipt = crypto.randomBytes(16).toString("hex")

    const order = await getRazorpay().orders.create({
      amount: plan.price * 100,
      currency: "INR",
      receipt,
      notes: {
        userId: String(userId),
        credits: String(plan.credits),
        plan: planType,
      },
    })

    return res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("billing error:", error)
    return res.status(500).json({
      success: false,
      message: error?.message ? `billing error: ${error.message}` : "billing error",
    })
  }
}
