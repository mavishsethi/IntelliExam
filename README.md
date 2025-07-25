# 🧠 IntelliExam – Exam Automation Tool

**IntelliExam** is a full-stack exam management portal that automates seating arrangements and admit card generation for educational institutions. It provides a seamless interface for students, teachers to manage exams, view duties, and generate PDFs efficiently.

---

## 🔥 Features

- 🪪 **Admit card PDF generation using PDFKit**
- 👥 **Role-based dashboards** for Students, Teachers
- 🔐 **JWT Authentication** for secure login
- 📤 **Teacher upload portal** for schedules & responsibilities
- 🧾 **Student view portal** for seating, admit cards, and exam details
- 🗃️ File uploads handled using **Multer**
- 📊 Fully responsive and intuitive UI

---

## 🧰 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **File Handling:** Multer, PDFKit
- **Other Tools:** Mongoose, Dotenv, CORS

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/intelliexam.git
cd intelliexam
```

### 2. Setup Environment Variables

Create a .env file in the server/ directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
### 3. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 4. Frontend Setup
```bash
cd client
npm install
npm run start


