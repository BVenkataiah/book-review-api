# 📚 Book Review RESTful API

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication** for managing books and user-submitted reviews.

---

## 🚀 Features

- User signup & login using JWT
- CRUD for books and reviews
- Pagination and filtering for books and reviews
- Search by title or author (partial, case-insensitive)
- One review per user per book
- Clean RESTful design

---

## 🧱 Tech Stack

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- Optional tools: Postman or `curl` for API testing

---

## 🛠️ Project Setup

### 1. Clone and install dependencies

bash
git clone https://github.com/BVenkataiah/book-review-api.git
cd book-review-api
npm install

### 2. Environment setup
Create a .env file in the root:
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookreviews
JWT_SECRET=your_jwt_secret

### 3. Start the server
node index.js

Server will run on http://localhost:3000.


### 🧪 Example API Requests
## 🔐 Signup & Login
curl -X POST http://localhost:3000/api/signup \
-H "Content-Type: application/json" \
-d '{"username": "john", "password": "password123"}'

curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"username": "john", "password": "password123"}'

### 📘 Books
## Create Book (Authenticated)

curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"title": "Sample Book", "author": "Jane Doe", "genre": "Fantasy"}'

## Get All Books (with pagination & filter)
curl "http://localhost:3000/api/books?page=1&limit=10&author=Jane"

## Get Book by ID
curl http://localhost:3000/api/books/<bookId>

## Search
curl "http://localhost:3000/api/search?q=sample"


### 📝 Reviews
## Add Review (Authenticated)
curl -X POST http://localhost:3000/api/books/<bookId>/reviews \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"rating": 4, "comment": "Excellent read!"}'

## Update Review
curl -X PUT http://localhost:3000/api/reviews/<reviewId> \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Updated comment"}'

## Delete Review
curl -X DELETE http://localhost:3000/api/reviews/<reviewId> \
-H "Authorization: Bearer <token>"

### 🧠 Design Decisions & Assumptions
## JWT-based stateless authentication

- Reviews are uniquely identified per user-book pair

- MongoDB used for flexibility and rapid development

- API follows REST conventions with separate routes for books, reviews, and auth

- Book and review filtering handled via query parameters

- No admin roles or moderation included (can be added later)

### 🗃️ Database Schema (MongoDB with Mongoose)
### User

| Field    | Type   | Description      |
| -------- | ------ | ---------------- |
| username | String | Unique user name |
| password | String | Hashed password  |

### Book 
| Field     | Type     | Description   |
| --------- | -------- | ------------- |
| title     | String   | Book title    |
| author    | String   | Book author   |
| genre     | String   | Book genre    |
| createdBy | ObjectId | Ref to `User` |

### Review
| Field   | Type     | Description    |
| ------- | -------- | -------------- |
| user    | ObjectId | Ref to `User`  |
| book    | ObjectId | Ref to `Book`  |
| rating  | Number   | Rating (1–5)   |
| comment | String   | Review comment |

### ✅ One review per user per book is enforced via a unique compound index.

### 📬 Postman Collection
You can import the collection manually or ask for the .json file version.
