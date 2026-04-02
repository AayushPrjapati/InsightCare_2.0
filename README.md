<div align="center">

<br/>

# InsightCare 🏥

A smart health web app that puts AI-powered tools, a chatbot, music therapy, and doctor consultations all in one place — no installs, no account, just open and go.

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Try_It_Now-10b981?style=for-the-badge)](https://aayushprjapati.github.io/InsightCare/)
[![Status](https://img.shields.io/badge/Status-Active-10b981?style=for-the-badge)]()
[![Built With](https://img.shields.io/badge/HTML%20·%20Tailwind%20·%20Vanilla_JS-f59e0b?style=for-the-badge)]()

<br/>

</div>

---

## 👋 What is InsightCare?

InsightCare is a health platform that runs entirely in your browser. No sign-up, no complicated setup. Just open `index.html` and everything works.

It's got a bunch of health tools built in — track your vitals, chat with an AI health buddy, check your cancer risk, get music recommendations based on your mood, and even join a video consultation. All in one page.

---

## ✨ What's inside

### 📊 MidiTools
Check your key health numbers and see if they're in the normal range. You can log readings and they'll be saved right in your browser.

Covers: **BMI · Blood Pressure · Cholesterol · Blood Sugar · Waist/Hip Ratio · Heart Rate**

### 💬 Fitzy — your health chatbot
Ask Fitzy anything about your health. Stress, sleep, heart health, BMI — it's got quick answers ready. Think of it like a friendly health FAQ bot, available 24/7.

### 🛡️ HealthGuard
Three tools in one:
- Fill out a short **cancer risk questionnaire** and get a Low/Medium/High result with tips
- **Log symptoms** with a severity level and notes — saved locally
- **Set appointment reminders** so you never miss a checkup

### 🎵 Music for your mood
Pick your current condition (stress, anxiety, insomnia, etc.), your age group, and gender — and get a playlist curated for your headspace. Music therapy, but make it personal.

### 📹 Consultation
A video call UI where you can see your local camera, mute yourself, and share your screen. Remote doctor connection is coming soon — the UI is all ready to go.

### 🧠 Disease Predictor *(coming soon)*
AI-powered early detection for Diabetes, Heart Disease, and Parkinson's. This one runs as a separate app and will be linked in once it's deployed.

---

## 🚀 Running it locally

It's as simple as it gets:

```bash
git clone https://github.com/aayushprjapati/InsightCare.git
cd InsightCare
open index.html
```

If you want the video consultation to work properly (camera permissions), run a quick local server instead:

```bash
python -m http.server 8000
# then go to http://localhost:8000
```

---



## 🗺️ What's next

- [x] MidiTools with all 6 health indicators
- [x] Fitzy chatbot
- [x] HealthGuard — risk quiz, symptom log, reminders
- [x] Music recommendations
- [x] Video call UI (local preview)
- [ ] Disease Predictor (AI/ML — Streamlit app)
- [ ] Real video call with doctor signaling
- [ ] Live AI responses for Fitzy
- [ ] Dark mode
- [ ] Mobile app

---

## 🤝 Want to contribute?

```bash
# fork it, then:
git checkout -b feature/your-idea
git commit -m "feat: your idea"
git push origin feature/your-idea
# open a Pull Request!
```

Keep tool logic in its own file under `tools/`, and try to keep things vanilla JS — no heavy frameworks needed here.

---

<div align="center">

Made with ❤️ by [Aayush Prajapati](https://github.com/aayushprjapati)

⭐ Drop a star if you like it!

[![GitHub stars](https://img.shields.io/github/stars/aayushprjapati/InsightCare?style=social)](https://github.com/aayushprjapati/InsightCare)

*© 2026 InsightCare. All rights reserved.*

</div>
