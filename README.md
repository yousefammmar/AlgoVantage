# 🚀 AlgoVantage

**AlgoVantage** is an elite, production-grade analytics platform for Competitive Programmers. Designed with a premium "Mission Control" aesthetic, it provides deep insights, proficiency tracking, and algorithmic forecasting for Codeforces athletes.

## ✨ Core Features

- **Mission Control Dashboard**: A high-impact, glassmorphism UI for visualizing your competitive journey.
- **Performance Forecasting**: Uses a weighted moving average algorithm (WMA) to predict your next contest rating based on recent momentum.
- **Domain proficiency Radar**: Interactive charts mapping your strengths and weaknesses across all problem tags.
- **Synthesized Profile Stats**: Real-time parallel data fetching from Codeforces API with redundant server-side caching (`node-cache`).
- **Cyber-Dark Theme**: A meticulously crafted premium dark mode designed for focus and aesthetic excellence.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TanStack Query (React Query), Chart.js, Lucide Icons.
- **Backend**: Node.js, Express, Axios, Node-Cache.
- **Security**: Helmet.js, Express Rate Limit, Morgan Logging.
- **Design**: Vanilla CSS with Cyber-Premium design tokens.

## 🏗 Project Structure

```bash
├── backend
│   └── src
│       ├── api         # Controllers & Routes
│       ├── config      # App configuration
│       ├── middlewares # Security & Rate limiting
│       └── services    # Codeforces API logic & Caching
├── frontend
│   └── src
│       ├── components  # Layout & UI pieces
│       ├── features    # Modular business logic (Profile)
│       ├── hooks       # Custom React hooks
│       ├── pages       # Main route views
│       └── services    # Frontend API clients
```

## 🚀 One-Click Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   ```

2. **Launch Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Launch Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📈 Algorithmic Forecasting
AlgoVantage implements a sophisticated projection engine that analyzes the last 4 contests. Unlike simple averages, it applies a decay function to weights, ensuring that your most recent "momentum" carries more influence over the prediction than older data points.

---
Built with ❤️ for the Competitive Programming Community.
