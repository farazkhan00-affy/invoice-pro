🚀 InvoicePro

«A modern invoicing and client management SaaS built for freelancers and small agencies.»

InvoicePro helps freelancers and small agencies create professional invoices, manage clients, track payments, and monitor their business finances from one clean dashboard.

🔗 Live Demo: https://invoice-pro-faraz19.vercel.app

---

✨ Features

- 🧾 Invoice Management — Create, manage, and track invoices
- 👥 Client Management — Store and manage client information
- 💰 Payment Tracking — Track paid and pending invoices
- 📊 Analytics Dashboard — Monitor revenue and financial insights
- 🔐 Authentication — Secure user authentication with Google OAuth
- 📱 Responsive UI — Works across desktop and mobile devices
- 🌙 Theme Support — Modern dark/light interface
- ⚡ Fast & Modern — Built with a modern full-stack architecture

---

🛠️ Tech Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Backend

- Next.js API Routes
- REST APIs

Database

- PostgreSQL
- Prisma ORM

Authentication

- Auth.js / NextAuth
- Google OAuth

Deployment

- Vercel

---

📂 Project Structure

InvoicePro/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── prisma/
├── public/
├── types/
├── .env.local
├── package.json
└── README.md

---

⚙️ Installation

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/invoice-pro.git
cd invoice-pro

2. Install dependencies

npm install

3. Configure environment variables

Create a ".env.local" file:

DATABASE_URL="your_database_url"

AUTH_SECRET="your_auth_secret"

GOOGLE_CLIENT_ID="your_google_client_id"

GOOGLE_CLIENT_SECRET="your_google_client_secret"

«⚠️ Never commit your ".env.local" file to GitHub.»

4. Setup Prisma

npx prisma generate
npx prisma migrate dev

5. Start the development server

npm run dev

Then open:

http://localhost:3000

---

🔐 Authentication

InvoicePro supports Google OAuth authentication.

For local development:

Authorized JavaScript Origin:
http://localhost:3000

Authorized Redirect URI:
http://localhost:3000/api/auth/callback/google

For production:

Authorized JavaScript Origin:
https://invoice-pro-faraz19.vercel.app

Authorized Redirect URI:
https://invoice-pro-faraz19.vercel.app/api/auth/callback/google

---

🚀 Deployment

InvoicePro is deployed on Vercel.

Production URL:

https://invoice-pro-faraz19.vercel.app

To create a production build:

npm run build

Make sure all required environment variables are configured in your Vercel project.

---

🎯 Why InvoicePro?

Freelancers and small agencies often use multiple tools to manage clients, invoices, and payments.

InvoicePro brings these essential workflows together into one simple platform:

Create → Track → Manage → Get Paid

---

🔮 Future Improvements

- 📄 PDF invoice generation
- 📧 Automated invoice emails
- 🔔 Payment reminders
- 💳 Online payment integration
- 🌍 Multi-currency support
- 📈 Advanced financial analytics
- 👥 Team/workspace management
- 📱 Progressive Web App support

---

👨‍💻 Developer

Faraz Hussain

BSCS Student • Full-Stack Web Developer • Cybersecurity Enthusiast

InvoicePro was built as a practical SaaS project to explore modern full-stack development, authentication, database management, API development, and cloud deployment.

---

⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub.

---

InvoicePro

Create. Track. Get Paid.

Built for freelancers and small agencies. 🚀