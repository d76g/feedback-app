# 🚀 Feedback App

A full-stack feedback application built with:

- **Backend:** Node.js, Express, TypeScript, Sequelize (PostgreSQL)
- **Frontend:** Vue 3, Vite, TypeScript, Tailwind CSS
- **Real-time:** Socket.IO for live feedback & comments

---

## 📂 Project Structure

```
/feedback-app
🔗 /backend     → Backend API & database (Express + Sequelize + TypeScript)
🔗 /frontend    → Frontend UI (Vue 3 + Tailwind CSS + Vite)
🔗 package.json → Main control for running full project
```

---

## 🛠️ Requirements

- Node.js >= v16
- PostgreSQL database

---

## ⚙️ Environment Setup

### 1️⃣ **Clone the repository**

```bash
git https://github.com/d76g/feedback-app.git
cd feedback-app
```

---

### 2️⃣ **Database Setup**

Ensure PostgreSQL is installed & running.

Create the database manually OR automatically via:

```bash
createdb feedback_db
```

**(The app will also attempt to create it automatically when running)**

---

### 3️⃣ **Install Dependencies**

Installs frontend & backend dependencies:

```bash
npm run install-all
```

---

### 4️⃣ **Run the Project**

This will:

- Auto-create DB (if doesn't exist)
- Run migrations
- Run seeders (only if data not already seeded)
- Start backend & frontend together

```bash
npm run start
```

---

## 💈️ Folder Specific Commands

### 📌 Backend Only:

```bash
# Run backend server
npm run dev --prefix backend

# Run migrations
npm run migrate --prefix backend

# Run seeders
npm run seed --prefix backend
```

### 📈 Frontend Only:

```bash
npm run dev --prefix frontend
```

---

## 🌐 Access

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/

---

## 📱 Real-Time Features

- Uses **Socket.IO** for live feedback/comments updates.
- Clients instantly see new feedback and comments without refreshing.

---

## 📝 Database Structure

- **Applications**
- **Users**
- **Feedback**
- **Comments**

Migrations & models are in `/backend/src/migrations` & `/backend/src/models`.


