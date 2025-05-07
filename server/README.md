## 1. 👀 Overview
This is the server-side component of the Personal Portfolio Project. It provides RESTful APIs to manage personal profile information, skills, diplomas, certifications, and projects. The backend is built with a focus on clean architecture, security, and maintainability—serving as the foundation for a professional, dynamic portfolio website.

---

## 2. ✨ Features
- **Profile Management**: Store and serve detailed personal profile information including name, bio, avatar, location, and social links.
- **Skills Management**: Add, update, or delete categorized technical and soft skills.
- **Diplomas & Certifications**: Manage educational qualifications and certifications with descriptions, institutions, and dates.
- **Project Showcase**: Maintain a collection of projects with titles, descriptions, tags, and links.
- **Input Validation**: Validate incoming data using `express-validator`.
- **JWT Authentication**: Secure user login and route protection using JSON Web Tokens.
- **Email Integration**: Contact form support through `nodemailer`.
- **Security**: Includes rate limiting, HTTP header protection, and CORS configuration.
- **Robust Error Handling**: Standardized and centralized error responses using `http-status-codes`.

---

## 3. 🔧 Technologies Used
- **Backend Framework**: `Node.js` with `Express.js` 
- **Database**: `MongoDB` with `mongoose`
- **Validation**: `express-validator` 
- **Environment Variables**: `dotenv` 
- **Security**: 
   - `jsonwebtoken` for JWT authentication
   - `helmet` (for setting secure HTTP headers) 
   - `express-rate-limit` (to prevent abuse and control API request rates)
- **CORS Handling**: `cors` (for enabling Cross-Origin Resource Sharing) 
- **HTTP Status Codes**: `http-status-codes` (for standardized HTTP response codes) 
- **Development & Monitoring**: `nodemon` (for automatic server restarts on file changes)
- **Password Hashing**: `bcrypt` (for securely hashing passwords)
- **Email**: nodemailer

---

## 4. 🚀 Getting Started

### 4.1. ✅ Prerequisites
- Node.js (v22.12.0 or higher)
- MongoDB installed and running
- npm (Node Package Manager)

### 4.2. ⬇️ Installation
1. Navigate to the `server` directory:

   ```bash
   cd server
2. Install all dependencies:

   ```bash
   npm install
3. Seed the entire database:

   ```bash
   npm run seed:all
4. Or seed individual collections as needed:

   ```bash
   npm run seed:profile
   npm run seed:skills
   npm run seed:diplomas
   npm run seed:certifications
   npm run seed:projects
5. Start the development server:

    ```bash
    npm run dev