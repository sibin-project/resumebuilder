# 🌟 ResumeMint AI — The Future of Resume Building

![ResumeMint Banner](https://img.shields.io/badge/AI--Powered-Resume--Builder-blueviolet?style=for-the-badge&logo=openai)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**ResumeMint AI** is a cutting-edge platform designed to revolutionize the way you create your professional identity. Leveraging powerful AI models and premium design templates, we bridge the gap between your skills and your dream job.

---

## 🚀 Key Features

### 🧠 AI-Driven Intelligence
- **Instant Generation:** Create professional summaries and bullet points in seconds using **Groq AI**.
- **ATS Optimization:** Intelligent content suggestions to pass through Applicant Tracking Systems (ATS) with ease.
- **Smart Suggestions:** Real-time feedback on your content quality and impact.

### 🎨 Premium Design System
- **Designer Templates:** A curated library of modern, minimal, and creative templates.
- **Live Preview:** See your resume evolve in real-time as you type, powered by a fast React renderer.
- **Vector Quality PDF:** Export your resumes in high-resolution, perfectly formatted PDF files.

### 🔐 Seamless Experience
- **One-Click Login:** Google Authentication integrated via Firebase for a friction-less start.
- **Persistent Storage:** Your progress is automatically saved to our secure MongoDB cloud.
- **Responsive Workspace:** A glassmorphism-inspired dashboard that works perfectly on desktop and tablet.

---

## 🛠️ Technology Stack

### **Frontend (The Client)**
- **Framework:** React 19 + Vite ⚡
- **Styling:** Tailwind CSS + Framer Motion (for fluid animations)
- **Icons:** Lucide React & Sparkles
- **State Management:** React Context & Hooks
- **PDF Engine:** html2canvas + jsPDF

### **Backend (The Server)**
- **Runtime:** Node.js (Express.js)
- **Database:** MongoDB + Mongoose
- **AI Engine:** Groq Cloud SDK
- **Security:** JWT (JSON Web Tokens) for session management
- **Authentication:** Frontend-Only Firebase Integration 🚀

---

## 📁 Project Structure

```text
aiResume/
├── client/                # 💻 React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI parts
│   │   ├── pages/         # Page components (Builder, Auth, Dashboard)
│   │   ├── context/       # Auth & Application State
│   │   └── firebase.js    # Client-side Firebase config
│   └── dist/              # Production build
├── server/                # ⚙️ Node.js Backend
│   ├── models/            # Mongoose Schemas (User, Resume, Template)
│   ├── routes/            # API Endpoints (Auth, AI, Resume)
│   ├── middleware/        # JWT Auth guards
│   └── server.js          # Entry point
└── README.md              # 📖 Documentation
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sibin-project/resumebuilder.git
   cd aiResume
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # PORT, MONGO_URI, JWT_SECRET, GROQ_API_KEY
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 📈 Roadmap
- [ ] Multiple Language Support
- [ ] LinkedIn Profile Import
- [ ] User Portfolio Hosting
- [ ] Real-time Resume sharing via unique link

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">Made with ❤️</p>
