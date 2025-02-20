# 🚀 Loan Management App

A **full-stack** loan management system built with **Next.js, Prisma, PostgreSQL, and Docker**.

## 📌 Features
- User authentication (NextAuth.js + Prisma)
- User roles & access levels (Bank Users)
- Client management for loan applications
- PostgreSQL database
- Docker support
- API routes for user and client management

---

## ⚡️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/loan-management-app.git
cd loan-management-app
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env file in the project root:

```bash
DATABASE_URL="postgresql://postgres@localhost:5432/loan_management?schema=public"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### For Docker, update your .env:

```bash
DATABASE_URL="postgresql://postgres:password@db:5432/loan_management?schema=public"
```

### 🛠️ Database Setup
With Prisma
Run migrations to set up the PostgreSQL database:

```bash
npx prisma migrate dev --name init
```

Or sync schema without migrations:

```bash
npx prisma db push
```

Using psql (Manual Setup)
```bash
psql -U postgres -d loan_management
```

### 🚀 Run the Development Server
```bash
npm run dev
```

Visit http://localhost:3000.

## 🐳 Docker Setup
### 1️⃣ Build & Run the Containers
```bash
docker-compose up --build
```

### 2️⃣ Stop Containers
```bash
docker-compose down
```

### 3️⃣ Check Running Containers
```bash
docker ps
```

## 🎯 Deployment
This app supports AWS ECS (Fargate) + GitHub Actions.

Push to prod branch to trigger deployment.
💡 Contributing
Feel free to fork and submit pull requests! 🚀

📜 License
MIT License.

