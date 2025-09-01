# 🎮 GameSpace

> A modern, interactive gaming platform built with Next.js, featuring multiple games, user authentication, and comprehensive admin management.

![GameSpace Home Page](./ProjectShowcase/Home%20Page.png)

## 🌟 Overview

GameSpace is a comprehensive web-based gaming platform that brings together classic and modern games in a beautifully designed interface. Built with Next.js and MongoDB, it offers a seamless gaming experience with user authentication, score tracking, social features, and administrative controls.

## 🎯 Features

### 🎮 Games Collection
- **Snake**: Classic snake game with progressive difficulty and wrap-around boundaries
- **Whack-a-Mole**: Fast-paced arcade game testing reflexes and reaction time
- **Memory Match**: Brain-training card matching game with emoji pairs
- **Tic Tac Toe**: Strategic two-player game with intelligent gameplay
- **1024**: Number puzzle game similar to 2048, challenging strategic thinking

### 🔐 Authentication & User Management
- Secure user registration and login system
- JWT-based session management with HttpOnly cookies
- Password encryption using bcrypt
- Admin role management and privileges

![Login Page](./ProjectShowcase/Log%20In.png)
![Sign Up Page](./ProjectShowcase/Sign%20Up.png)

### 👤 User Profiles
- Comprehensive user dashboard with game statistics
- Score tracking across all games
- Game activity history and analytics
- Achievement system UI (currently uses static mock data for demonstration)

![Profile Page](./ProjectShowcase/Profile%20Page%20(dummy%20data).png)
*Note: The profile page uses real-time data from the database for user info and game scores. Achievement system currently displays static demo data.*

### 🎯 Game Experience
- Real-time score tracking and leaderboards
- Responsive design for desktop and mobile
- Interactive commenting system for each game
- Smooth animations and modern UI/UX

![Unified Game Page](./ProjectShowcase/Unified%20Page%20for%20Game%20Containers.png)
![Comments System](./ProjectShowcase/Comments%20in%20Unified%20Page%20for%20Game%20Containers.png)

### 🛠️ Admin Dashboard
- Complete user management system
- Real-time platform statistics
- User role management (admin/regular user)
- Content moderation tools

![Admin Panel](./ProjectShowcase/Admin%20Panel%20for%20User%20Management.png)
![Stats Dashboard](./ProjectShowcase/Stats%20Page%20(dummy%20data).png)

## 🏗️ Tech Stack

### Frontend
- **Next.js 15.3.1** - React framework for production
- **React 19.1.0** - User interface library
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing tool

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 6.16.0** - NoSQL database
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcrypt 5.1.1** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **JavaScript** - Primary programming language

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account or local MongoDB instance
- Git for version control

### 1. Clone the Repository
```bash
git clone https://github.com/abdularhamkhan/GameSpace.git
cd GameSpace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `next.config.mjs` file with your database credentials:

```javascript
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    DATABASE_URL: "your_mongodb_connection_string",
    JWT_SECRET: "your_jwt_secret_key",
    JWT_EXPIRES_IN: "1h"
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
};

export default nextConfig;
```

### 4. Database Setup
The application will automatically create the necessary collections:
- **Users** - User accounts and authentication
- **Comments** - Game comments and discussions
- **Scores** - Game scores and statistics

### 5. Initialize Admin User
Run the admin setup script to create your first admin user:
```bash
node scripts/set-first-admin.js
```

### 6. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🎮 Games Overview

### Snake 🐍
- **Objective**: Guide the snake to eat food while avoiding collisions
- **Features**: Progressive speed increase, boundary wrap-around, high score tracking
- **Controls**: Arrow keys for movement, spacebar to pause

### Whack-a-Mole 🐹
- **Objective**: Hit as many moles as possible within the time limit
- **Features**: 25-second gameplay, random mole spawning, animated transitions
- **Controls**: Click/tap on moles to score points

### Memory Match 🎴
- **Objective**: Find all matching pairs of emoji cards
- **Features**: 6 pairs (12 cards), move counter, time tracking
- **Controls**: Click cards to flip and find matches

### Tic Tac Toe ✕⭘
- **Objective**: Get three in a row before your opponent
- **Features**: Two-player gameplay, win detection, draw logic
- **Controls**: Click on grid squares to place marks

### 1024 🔢
- **Objective**: Combine numbered tiles to reach 1024
- **Features**: 4x4 grid, tile combination mechanics, score calculation
- **Controls**: Arrow keys or swipe gestures to move tiles

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/check-admin` - Check admin privileges

### Games
- `GET /api/[game]/comments` - Get game comments
- `POST /api/[game]/comments` - Add game comment
- `GET /api/[game]/scores` - Get game scores
- `POST /api/[game]/scores` - Submit game score

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get platform statistics
- `POST /api/admin/set-admin-status` - Manage user roles

### Comments
- `DELETE /api/deleteComment/[commentID]` - Delete specific comment

## 📁 Project Structure

```
GameSpace/
├── components/           # Reusable React components
│   ├── auth/            # Authentication forms
│   ├── games/           # Individual game components
│   │   ├── snake/       # Snake game implementation
│   │   ├── whack-a-mole/# Whack-a-Mole game
│   │   ├── memory-match/# Memory Match game
│   │   ├── tictactoe/   # Tic Tac Toe game
│   │   └── 1024/        # 1024 puzzle game
│   └── profile/         # User profile components
├── pages/               # Next.js pages and API routes
│   ├── api/            # Backend API endpoints
│   ├── auth/           # Authentication pages
│   ├── games/          # Game container pages
│   └── admin/          # Admin dashboard pages
├── lib/                # Utility libraries
├── scripts/            # Database and admin scripts
├── styles/             # CSS stylesheets
├── public/             # Static assets
└── ProjectShowcase/    # Application screenshots
```

## 🔒 Security Features

- **Password Hashing**: All passwords are encrypted using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **HttpOnly Cookies**: Prevents XSS attacks on authentication tokens
- **Admin Privileges**: Role-based access control for sensitive operations
- **Input Validation**: Server-side validation for all user inputs
- **MongoDB Security**: Parameterized queries prevent injection attacks

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all production environment variables are properly configured:
- MongoDB connection string
- JWT secret key
- Any additional API keys

### Database Migration
The application handles database schema automatically. For production:
1. Ensure MongoDB Atlas cluster is configured
2. Run admin setup scripts if needed
3. Verify all collections are properly indexed

## 📄 License

This project is developed as part of the Advanced Programming course (Spring 2025). All rights reserved to the development team.

Note: This README.md was generated with the help of AI.

*GameSpace - Where Gaming Meets Modern Web Technology* 🎮✨




