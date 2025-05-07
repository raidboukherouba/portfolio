## 1. 👀 Overview
This is the frontend component of the Personal Portfolio Project. It provides a React-based user interface for presenting personal details, skills, academic credentials, and projects. Built for modern performance and developer experience, the app is highly responsive, fast, and styled with Tailwind CSS.

---

## 2. ✨ Features
- **JWT-Based Authentication**: Secure login functionality to access the admin dashboard.
- **Profile Display**: Showcase bio, avatar, profession, age, location, and CV.
- **Skills Management**: Visualize technical and soft skills.
- **Diplomas & Certifications**: Highlight educational background and achievements.
- **Project Portfolio**: Display professional or personal projects with detailed descriptions.
- **Responsive UI**: Optimized for desktop and mobile viewing.
- **Toast Notifications**: Inform users about actions and status updates using react-toastify.
- **Modern Styling**: Built with Tailwind CSS for a clean and efficient user interface.
- **Form Handling & Validation**: Robust client-side validation with react-hook-form and @hookform/resolvers.

---

## 3. 🔧 Technologies Used
- **Frontend Framework**: `React` (v19)
- **Routing**: `react-router-dom`
- **HTTP Client**: `axios`
- **Form Management**: `react-hook-form`
- **Validation**: `@hookform/resolvers`
- **Styling**: `tailwindcss`
- **Icons**: `react-icons`
- **Toasts & Notifications**: `react-toastify`
- **Debouncing**: `lodash.debounce`
- **Build Tool**: `Vite`
- **Language**: `TypeScript`

---

## 4. 🚀 Getting Started

### 4.1. ✅ Prerequisites
- Node.js (v22.12.0 or higher)
- npm (Node Package Manager)

### 4.2. ⬇️ Installation
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 5. 📂 Project Structure
```
client/
│── node_modules/     # Project dependencies
│── public/           # Static assets (favicon, images, etc.)
│── src/              # Source code
│   ├── assets/       # Fonts, icons, or static images
│   ├── components/   # Reusable UI components
│   ├── context/      # Global React context (e.g. auth)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and helpers
│   ├── pages/        # Application views (Home, Admin, etc.)
│   ├── services/     # API calls and request logic
│   ├── App.tsx       # Main App component
│   ├── index.css     # Tailwind and global styles
│   ├── main.tsx      # App entry point
│── .env              # Environment variables
│── package.json      # Project metadata and scripts
│── tsconfig.json     # TypeScript configuration
│── vite.config.ts    # Vite configuration
```

---

## 6. 🔐 Environment Variables
Create a `.env` file in the `client` directory and configure:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
Adjust the `VITE_API_BASE_URL` to match your backend server URL.

---

## 7. 🤝 Contributing
If you wish to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes with clear messages.
4. Push your branch and create a Pull Request.

---

## 8. 🛠️ Development Tools
- **TypeScript**: Ensures type safety across the project.
- **Vite**: Fast build tool for modern web projects.

---

## 9. 📜 License
This project is licensed under the **MIT License**.

