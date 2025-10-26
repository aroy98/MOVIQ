# 🚀 Project Setup Instructions

This document provides step-by-step instructions to install dependencies, configure the TMDB API token, and start Vite + React project.

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/aroy98/MOVIQ.git
cd MOVIQ
```

### 2. Install Node Packages

```bash
npm install
```

---

## 🔑 TMDB API Token Configuration

This project uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API to fetch movie data such as titles, ratings, posters, and more.
To use the application, you’ll need to set up your **TMDB API access token**.

### 📋 Step 1: Create a TMDB Account

1. Visit [TMDB.org](https://www.themoviedb.org/).
2. Sign up or log in to your existing account.
3. Go to your [TMDB API settings](https://www.themoviedb.org/settings/api).
4. Click on **“Create”** or **“Generate API Read Access Token (v4 auth)”**.
5. Copy your **API access token** (it starts with `eyJ...`).

---

### ⚙️ Step 2: Configure the API Token in Your Project

Create a `.env` file in the **root directory** of your project (if not already present) and add your TMDB API token as follows:

```bash
VITE_API_ACCESS_TOKEN=your_tmdb_access_token_here
```

> ⚠️ Replace `your_tmdb_access_token_here` with your actual TMDB API access token.

---

### 🧩 Step 3: Access the Token in Your Code

Use the access token in your API requests by adding it as a **Bearer Authorization header**:

```ts
const TMDB_API_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const fetchMovies = async (query: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
      },
    }
  );
  return response.json();
};
```

---

### 🧪 Step 4: Verify Configuration

To verify your configuration:

1. Start your development server:

   ```bash
   npm run dev
   ```
2. Search for a movie — if results load successfully, your API token is correctly configured.

---

### 🚫 Troubleshooting

If you see errors such as:

* `401 Unauthorized`
* `Invalid access token: You must be granted a valid token.`

Double-check that:

* Your `.env` file is in the **root folder**.
* The variable name is **exactly** `VITE_API_ACCESS_TOKEN`.
* You restarted the development server after adding the `.env` file.

---

## ▶️ Start the Development Server

Run the app in development mode:

```bash
npm run dev
```

After the server starts, open the local URL shown in your terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## 🧪 Run Tests

To run tests:

```bash
npm run test
```

To view coverage:

```bash
npm run test:coverage
```

---

## 🏗️ Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
your-project/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── stores/
│   ├── tests/
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
├── public/
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧠 Tech Stack

* **Frontend:** React + TypeScript + Vite
* **UI Library:** shadcn/ui, Lucide Icons
* **Routing:** React Router
* **Testing:** Jest + React Testing Library
* **Build Tool:** Vite

---

## 👨‍💻 Author

**Akash Roy**
[GitHub](https://github.com/aroy98) | [LinkedIn](https://www.linkedin.com/in/akash-roy-979402203)

---
