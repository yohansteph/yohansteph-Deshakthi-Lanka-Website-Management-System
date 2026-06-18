# 🚀 Deshakthi Lanka - PPA Project

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## 📖 Project Overview

Deshakthi Lanka is a web-based job recruitment and career development platform designed to connect job seekers with employers. The platform provides job listings, candidate applications, employer registration, skill assessments, career guidance, and inquiry management.

The system helps job seekers discover opportunities while enabling employers to recruit qualified candidates efficiently.

---

## ✨ Features

### 👨‍💼 Job Seeker Features
- User Registration & Login
- Secure Password Storage using Bcrypt
- Browse Available Jobs
- View Job Details
- Apply for Jobs
- Upload CV/Resume
- Candidate Dashboard
- Skill Assessment Tests
- View Career Resources

### 🏢 Employer Features
- Employer Registration
- Submit Recruitment Requests
- Manage Job Opportunities
- Review Candidate Applications

### 🛠 Admin Features
- Manage Jobs
- View Applications
- Manage Employer Requests
- Monitor User Activities
- Manage Inquiries

### 📧 Communication Features
- Contact Form
- Inquiry Management
- OTP Email Verification
- Automated Email Notifications

### 🧠 Skill Assessment System
- IT Assessments
- Healthcare Assessments
- Engineering Assessments
- Construction Assessments
- Test Scoring & Evaluation

---

## 🏗 System Architecture

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose ODM

### Additional Libraries
- Multer (File Uploads)
- Nodemailer (Email Service)
- BcryptJS (Password Hashing)
- OTP Generator
- CORS
- Dotenv

---

## 📂 Project Structure

```bash
PPA Project/
│
├── models/
│   ├── Application.js
│   ├── Assessment.js
│   ├── Employer.js
│   ├── Inquiry.js
│   ├── Job.js
│   ├── TestAttempt.js
│   └── User.js
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── FindJobs.html
│   ├── JobDetails.html
│   ├── employer.html
│   ├── candidate-dashboard.html
│   ├── skill-test.html
│   ├── ContactUs.html
│   └── assets/
│
├── routes/
│
├── server.js
├── package.json
├── package-lock.json
└── .env
```

---

## 🗄 Database Models

### User
```javascript
{
  fullName,
  email,
  phone,
  password
}
```

### Job
```javascript
{
  jobTitle,
  location,
  salary,
  category,
  description,
  isUrgent,
  imageUrl,
  postedDate
}
```

### Application
```javascript
{
  jobId,
  jobTitle,
  applicantName,
  email,
  phone,
  message,
  cvUrl,
  status
}
```

### Employer
```javascript
{
  contactName,
  email,
  companyName,
  targetRegion,
  comment,
  status
}
```

---

## ⚙️ Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ppa-project.git
```

### 2. Navigate to Project

```bash
cd ppa-project
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 5. Start Server

```bash
node server.js
```

or

```bash
npm start
```

### 6. Open Application

```text
http://localhost:5000
```

---

## 🔐 Security Features

- Password Encryption using BcryptJS
- Email OTP Verification
- File Upload Validation
- MongoDB Data Protection
- Secure Authentication Mechanisms

---

## 📧 Email Integration

The project uses Nodemailer with Gmail SMTP services for:

- OTP Verification
- Candidate Notifications
- Employer Communications
- Inquiry Responses

---

## 📁 File Upload Support

Supported uploads:

- CV/Resume Files
- Profile Documents
- Job Related Attachments

Storage Location:

```bash
/public/cvs/
/public/uploads/
```

---


## 📸 Screens Included

- Home Page
- Job Listings
- Job Details
- Login/Register
- Employer Registration
- Candidate Dashboard
- Skill Assessment
- Contact Page
- Admin Panel

---

## 🤝 Contributors

### Team Members

- Yohan (Project Leader)
- Nathan
- Wameesha
- Kavindu
- Rovin


---

## 📄 License

This project is licensed under the ISC License.

---

## 💡 Project Purpose

This project was developed as part of an academic software engineering project to provide a complete recruitment management solution that connects job seekers, employers, and administrators through a centralized platform.

---

