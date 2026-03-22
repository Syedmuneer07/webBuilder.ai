import crypto from "crypto"
import User from "../models/user.model.js"

const compareHexSignatures = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false
  try {
    const bufA = Buffer.from(a, "hex")
    const bufB = Buffer.from(b, "hex")
    if (bufA.length !== bufB.length) return false
    return crypto.timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

export const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  const signature = req.headers["x-razorpay-signature"]

  if (!secret) {
    console.error("razorpay webhook: RAZORPAY_WEBHOOK_SECRET is not set")
    return res.status(500).json({ success: false, message: "server configuration error" })
  }

  if (!signature) {
    console.error("razorpay webhook: missing x-razorpay-signature header")
    return res.status(400).json({ success: false, message: "missing signature" })
  }

  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body))

  let expectedSignature
  try {
    expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex")
  } catch (err) {
    console.error("razorpay webhook: signature compute failed", err)
    return res.status(500).json({ success: false, message: "signature error" })
  }

  if (!compareHexSignatures(expectedSignature, signature)) {
    console.error("razorpay webhook: invalid signature")
    return res.status(400).json({ success: false, message: "invalid signature" })
  }

  let event
  try {
    event = JSON.parse(rawBody.toString("utf8"))
  } catch (err) {
    console.error("razorpay webhook: invalid JSON body", err)
    return res.status(400).json({ success: false, message: "invalid payload" })
  }

  if (event.event !== "payment.captured") {
    return res.json({ received: true })
  }

  try {
    const payment = event.payload?.payment?.entity
    if (!payment?.notes) {
      console.error("razorpay webhook: payment.captured missing notes", event?.payload)
      return res.status(400).json({ success: false, message: "missing payment notes" })
    }

    const userId = payment.notes.userId
    const credits = Number(payment.notes.credits)
    const plan = payment.notes.plan

    if (!userId || Number.isNaN(credits) || !plan) {
      console.error("razorpay webhook: invalid notes", payment.notes)
      return res.status(400).json({ success: false, message: "invalid notes" })
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { credits },
      plan,
    })
  } catch (err) {
    console.error("razorpay webhook: payment.captured handler failed", err)
    return res.status(500).json({ success: false, message: "webhook processing failed" })
  }

  return res.json({ received: true })
}
