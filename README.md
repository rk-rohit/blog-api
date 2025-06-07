# 📝 Blog API

A RESTful Blog API built with **Node.js**, **Express**, and **MongoDB**. Includes authentication, protected routes, and full CRUD operations for blog posts.

---

## 🚀 Features

- User registration and login with JWT
- Protected blog routes
- Blog CRUD (Create, Read, Update, Delete)
- Token blacklisting on logout
- MongoDB with Mongoose
- Error handling and validation
- WebSocket support (Socket.io)

---

## 📁 Folder Structure

---

## 🔐 API Routes

### Auth Routes

- `POST /api/v1/user/register` – Register new user  
- `POST /api/v1/user/login` – Login user and return JWT  
- `POST /api/v1/user/logout` – Logout and blacklist refresh token (auth required)  

### Blog Routes

- `GET /api/v1/blog` – Get all blogs  
- `POST /api/v1/blog` – Create a new blog (auth required)  
- `GET /api/v1/blog/my` – Get our post blog (auth required)  

---

## 🛠️ Getting Started

```bash
git clone https://github.com/rk-rohit/blog-api.git
cd blog-api
npm install
cp .env.example .env  # Create your .env file
npm start

## 🛠️ Enviroment variable configuration
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key


