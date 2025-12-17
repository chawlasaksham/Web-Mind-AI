# WebMind AI 🧠✨

**WebMind AI** is a powerful Chrome extension that integrates Google Gemini directly into your browser. It empowers you to consume information faster and write more effectively without switching tabs.

---

## 🚀 Features

### 🔹 Page Summarization
- Generate concise, high-quality summaries of any webpage.
- Perfect for articles, blogs, documentation, and long research papers.

### 🔹 Smart Rewrite Mode
- Select any text on a webpage and transform it instantly.
- **Available Styles:**
  - **Simplified:** Makes complex topics easy to understand.
  - **Professional:** Polishes text for business or formal use.
  - **Concise:** Removes fluff for direct communication.
  - **Elaborate:** Expands on ideas for more detail.

### 🔹 Contextual Chat
- Ask specific questions about the current page content.
- The AI provides answers **strictly based on the page context**, reducing misinformation and saving you from scrolling.

### 🔹 Voice Input Support
- Use the built-in microphone icon to ask questions using your voice.
- Automatic speech-to-text conversion for a hands-free experience.

### 🔹 Modern UI/UX
- **Floating Assistant:** A sleek interface that lives on top of your browser.
- **Dark Mode Design:** Clean, modern, and easy on the eyes.
- **Smooth Animations:** Powered by Tailwind CSS for a premium feel.

---

## 🛠️ Tech Stack

- **Core:** JavaScript (ES6+)
- **Browser Engine:** Chrome Extensions API (Manifest V3)
- **AI Backend:** [Google Gemini API](https://ai.google.dev/)
- **Styling:** HTML5 + Tailwind CSS
- **Voice:** Web Speech API

---

## 📦 Installation (Local Development)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/chawlasaksham/Web-Mind-AI.git](https://github.com/chawlasaksham/Web-Mind-AI.git)

2. Enable **Developer Mode** using the toggle in the top-right corner.

3. Click **Load Unpacked** and select the folder where you cloned this repository.

---

## 🔑 API Key Setup

This extension requires a **Google Gemini API key**.

1. Get a free API key from **Google AI Studio**:
https://ai.google.dev

2. Open the `background.js` file in the project folder.

3. Locate the following line and replace the placeholder with your API key:
```javascript
const API_KEY = "PASTE_YOUR_API_KEY_HERE";
