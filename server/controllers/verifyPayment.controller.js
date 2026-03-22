import crypto from "crypto"

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

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!secret) {
      return res.status(500).json({ success: false, message: "server configuration error" })
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are required",
      })
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex")

    if (!compareHexSignatures(expectedSignature, razorpay_signature)) {
      return res.status(400).json({ success: false, message: "invalid payment signature" })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("verify payment error:", error)
    return res.status(500).json({ success: false, message: "verification failed" })
  }
}
