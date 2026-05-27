# 🧠 Second Brain

**Second Brain** is a beautifully designed, sleek content management dashboard that allows you to collect, organize, and share your favorite digital content in a Pinterest-style masonry layout.

Whether it's an insightful Twitter thread, an interesting YouTube video, an Instagram post, or a quick text note, Second Brain provides a unified space to store and access your digital knowledge.

## ✨ Features

- 📌 **Masonry Layout**: A dynamic, highly aesthetic, responsive column layout that automatically adapts to your screen size.
- 🔗 **Rich Embeds**: Paste links for Twitter, YouTube (including Shorts!), and Instagram, and watch them instantly transform into interactive embedded cards.
- 📝 **Text Notes**: Ditch the links and write down quick thoughts, ideas, or to-dos seamlessly within the dashboard.
- 📱 **Fully Responsive & Collapsible Sidebar**: Navigate efficiently using a collapsible sidebar that slides smoothly with the layout and gracefully overlays on mobile screens.
- 🌐 **Public Sharing**: Generate a unique hash link to instantly share a read-only version of your Second Brain with anyone on the internet.
- 🛠️ **Full-Stack Vercel Architecture**: A completely unified monorepo containing a Vite React frontend and an Express.js backend, natively optimized for Vercel Serverless Deployment.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT)
- **Deployment**: Optimized for Vercel Serverless Functions

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Connection String

### Setup

1. **Clone the repository** and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd SecondBrain
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file at the root of the directory and add your MongoDB URI and JWT Secret:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   *Note: Because the backend routes through `/api` and relies on Vercel's serverless environment, local development of the backend alongside the Vite server might require the [Vercel CLI (`vercel dev`)](https://vercel.com/docs/cli) for the most accurate full-stack routing experience.*

## ☁️ Deploying to Vercel

This repository is strictly configured to be deployed as a single project on Vercel.

1. Create a new GitHub repository and push this codebase to it.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
3. Import your newly created GitHub repository.
4. Set the **Root Directory** to `SecondBrain` (if the project is nested). If the repository is directly the `SecondBrain` folder, leave it default.
5. In the **Environment Variables** section, ensure you add `MONGODB_URI` and `JWT_SECRET`.
6. Click **Deploy**! Vercel will automatically build the React frontend and map the `api/` directory into scalable serverless functions.
