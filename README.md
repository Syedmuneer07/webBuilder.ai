🚀 AI Web Builder
<p align="center"> <a href="https://webbuilder-ai-1.onrender.com/"> <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=render" /> </a> <a href="https://github.com/Syedmuneer07/webBuilder.ai"> <img src="https://img.shields.io/github/stars/Syedmuneer07/webBuilder.ai?style=for-the-badge" /> </a> <img src="https://img.shields.io/badge/FullStack-MERN-blue?style=for-the-badge" /> <img src="https://img.shields.io/badge/Payments-Razorpay-orange?style=for-the-badge" /> </p> <p align="center"> <b>Build. Manage. Deploy Websites with AI + Secure Payments 💡</b> </p>
✨ Overview

AI Web Builder is a full-stack SaaS platform that enables users to create and manage websites with a credit-based subscription system powered by secure payment integration.

💳 Payments are handled via Razorpay, with automated plan upgrades using webhook events.

🚀 Features
🔐 Secure Authentication (JWT + Cookies)
🌐 Dynamic Website Builder & Manager
💳 Credit-Based Subscription System
⚡ Razorpay Payment Integration
🔄 Webhook Automation (payment.captured)
📦 Modular Backend Architecture
📱 Responsive UI
🛠️ Tech Stack
<p align="center"> <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,js,css" /> </p>
Frontend: React (Vite)
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Payments: Razorpay
Deployment: Render
💳 Payment Flow (Animated)
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Razorpay

    User->>Frontend: Select Plan
    Frontend->>Backend: POST /api/billing
    Backend->>Razorpay: Create Order
    Razorpay-->>Frontend: Order Details
    Frontend->>User: Open Checkout
    User->>Razorpay: Complete Payment
    Razorpay->>Backend: Webhook (payment.captured)
    Backend->>Database: Update Credits & Plan
⚙️ Installation
🔹 Clone Repo
git clone https://github.com/Syedmuneer07/webBuilder.ai
cd webBuilder.ai
🔹 Backend Setup
cd server
npm install

.env

PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=your_secret

FRONTEND_URL=http://localhost:5173
npm run dev
🔹 Frontend Setup
cd client
npm install

.env
VITE_RAZORPAY_KEY=rzp_test_xxxxx
VITE_API_URL=http://localhost:8000
npm run dev
🔐 Webhook Setup
Go to Razorpay Dashboard
Add webhook:
https://your-backend-url/api/razorpay/webhook
Event:
payment.captured
Add secret in .env
📁 Project Structure
webBuilder.ai/
│
├── client/        # Frontend
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
│
└── README.md
🚀 Deployment
Backend → Render
Frontend → Vercel / Netlify
📊 Stats
<p align="center"> <img src="https://github-readme-stats.vercel.app/api?username=Syedmuneer07&show_icons=true&theme=radical" /> </p>
🤝 Contributing

Pull requests are welcome!
Fork → Improve → PR 🚀

👨‍💻 Author

Syed Muneerul Zakireen

GitHub: https://github.com/Syedmuneer07

email: syedmuneerzakk@gmail.com
