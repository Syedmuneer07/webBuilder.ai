import "dotenv/config"
import Razorpay from "razorpay"

let instance = null

/** Lazily create Razorpay so the server can boot before env is read (ESM import order) and so missing keys don’t crash at import time. */
export default function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET
  if (!key_id || !key_secret) {
    throw new Error(
      "Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET. Add them to server/.env."
    )
  }
  if (!instance) {
    instance = new Razorpay({ key_id, key_secret })
  }
  return instance
}
