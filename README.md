# Deshakthi Lanka - Web-Based Recruitment Management System

A full-stack recruitment management system and public portal designed to streamline the international hiring process. This platform allows candidates to explore global job opportunities, assess their qualifications, and manage their applications, while providing an administrative backend for application tracking.

## Key Features

### Public Portal
*   **Education & Qualifications Hub:** Displays global industry requirements (Culinary, Healthcare, Construction) with detailed minimum educational and vocational standards.
*   **Qualification Assessment:** An interactive assessment form allowing candidates to submit their educational background, target destinations, and work experience for expert evaluation.
*   **About Us & Corporate Info:** Fully responsive static pages providing company information, team details, and seamless navigation.

### Candidate Dashboard (Authenticated)
*   **Secure Authentication:** User registration, login, and OTP verification via secure routes.
*   **Profile Management:** Candidates can securely update personal details without exposing sensitive credential endpoints.
*   **CV Uploads & Storage:** Integrated file uploading using `multer` allowing users to upload and update their CVs (stored locally in `/public/cvs/`).
*   **Application Tracking:** Real-time visibility into the status of submitted job applications (e.g., Pending, Reviewed, Accepted).

### Skill Assessment Module
*   **Automated Testing:** Industry-specific multiple-choice tests fetching 10 category-specific questions dynamically.
*   **Evaluation Logic:** Automated grading system requiring a 70% passing score to qualify.
*   **Cooldown Mechanism:** Enforces a 24-hour lockout period for failed test attempts, securely logged in the database.

---

## Technology Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (Mongoose ODM)
*   **Middleware & Utilities:** `multer` (File Uploads), standard RESTful routing.

---

## Installation & Local Setup

> **Note on Deployment:** This application utilizes `multer` for local file storage (saving CVs to the `/public/` directory). Therefore, it is designed to be hosted on environments that support persistent local file systems (like a VPS, EC2, or local machine) rather than serverless environments with read-only file systems.

To run this project locally on your machine:

1. **Clone the repository:**
```bash
   git clone [https://github.com/yourusername/deshakthi-lanka-portal.git](https://github.com/yourusername/deshakthi-lanka-portal.git)
   cd deshakthi-lanka-portal
