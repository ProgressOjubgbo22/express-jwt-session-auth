Express Authentication System

This is a simple authentication backend built with Node.js and Express.js. It demonstrates both session-based authentication and JWT-based authentication, along with secure password hashing using bcrypt.

Features
User registration
User login
Password hashing with bcrypt
Session-based authentication (express-session)
JWT-based authentication
Protected routes
User logout

Tech Stack
Node.js
Express.js
bcrypt
express-session
jsonwebtoken

API Endpoints

Session-Based Auth
POST /register → Register user
POST /login → Login user (creates session)
GET /profile → Get logged-in user
POST /logout → Logout user

JWT-Based Auth
POST /register → Register user
POST /login → Login user (returns token)
GET /profile → Protected route (requires token)
POST /logout → Logout (client-side token removal)
