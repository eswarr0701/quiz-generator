# ⚡ QuizForge — AI Quiz Generator

Full-stack AI quiz generator built with Express.js + Claude API + Vanilla HTML/CSS/JS.

---

## 📁 Project Structure

```
quiz-generator/
├── backend/
│   ├── server.js        ← Express API server
│   └── package.json
└── frontend/
    └── index.html       ← Complete frontend (single file)
```

---

## 🚀 Setup & Run

### 1. Install backend dependencies
```bash
cd backend
npm install
```

### 2. Set your Anthropic API key
```bash
# Windows
set ANTHROPIC_API_KEY=your_api_key_here

# Mac/Linux
export ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from: https://console.anthropic.com/

### 3. Start the backend server
```bash
npm start
# Server runs on http://localhost:5000
```

### 4. Open the frontend
Open `frontend/index.html` directly in your browser.
(No build step needed — it's plain HTML!)

---

## ✨ Features

- **4 Question Types** — MCQ, True/False, Short Answer, Mixed
- **3 Difficulty Levels** — Easy, Medium, Hard
- **Paste Notes** — Upload your own study material and generate questions from it
- **Instant Scoring** — Submit quiz and see your score with explanations
- **Progress Bar** — Track how many questions you've answered
- **Beautiful Dark UI** — Professional design with purple accent theme

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js, Express.js |
| AI | Anthropic Claude (claude-sonnet-4-6) |
| Styling | Custom CSS with CSS variables |

---

## 🔧 Customization

To change the number of questions options, edit the `<select id="numQuestions">` in `frontend/index.html`.

To change the AI model, edit `model` in `backend/server.js`.

To change the backend port, set `PORT` environment variable or edit `server.js`.

---

## 📦 Future Enhancements

- [ ] PDF upload support (parse PDF → generate quiz)
- [ ] Save quiz history (localStorage or MongoDB)
- [ ] Timer per question
- [ ] Leaderboard / share quiz link
- [ ] Export quiz as PDF
