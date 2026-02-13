# 🚀 GitHub Portfolio Analyzer

> **AI-Powered Tech Recruiter Audit for Developers.**
> Get a ruthless, data-driven critique of your GitHub profile to help you land your next role.

![Banner](/media/banner.png)

## 💡 What is this?
The **GitHub Portfolio Analyzer** uses **Gemini 2.0 Flash** (via OpenRouter) to act as a **Senior Technical Recruiter**. It scans your public repositories, analyzes your code quality, consistency, and documentation, and provides a **ruthless** score out of 100.

Unlike generic tools, this analyzer uses **Context-Aware Scoring**:
- **Students** are judged on potential and learning growth (taking "One-Hit Wonders" into account).
- **Professionals** are judged on architecture, consistency, and complexity.

## ✨ Features
- **🔍 Deep Repo Scanning**: Analyzes your Top 6 repos, not just the pinned ones.
- **🧠 Context-Aware AI**: Distinguishes between "Hello World" tutorials and production engineering.
- **⚖️ Balanced Scoring**: Rewards execution, penalizes tutorial clones.
- **📉 Visual Analytics**: Beautiful, dark-mode charts showing your "Impact", "Code Quality", and "Consistency".
- **🚀 Actionable Feedback**: Specific, strict advice on how to improve your score.

## 🛠️ Tech Stack
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **AI Engine:** [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) (via OpenRouter)
- **Data:** [GitHub REST API](https://docs.github.com/en/rest)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- GitHub Token (for API rate limits)
- OpenRouter/Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pranjal685/Github-Portfolio-Analyzer.git
   cd Github-Portfolio-Analyzer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file:
   ```env
   GITHUB_TOKEN=your_github_token
   OPENROUTER_API_KEY=your_openrouter_key
   AI_MODEL=google/gemini-2.0-flash-001
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🤝 Contributing
Contributions are welcome! Please fork the repo and submit a PR.

## 📄 License
MIT License © 2026
