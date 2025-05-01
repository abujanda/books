# Book Notes App (MERN Stack)

Welcome to the **Book Notes App**!  
This project allows users to track notes about the books they've read, including summaries, ratings, and reading dates.  
The project is built using the **MERN stack**: **MongoDB, Express, React.js/Next.js, and Node.js**, and is divided into two main components:

- [`book-api`](./book-api) — The backend API (Node.js + Express)
- [`book-app`](./book-app) — The frontend application (Next.js)

## 📚 Project Structure

```bash
.
├── books-api/      # Node.js API with CRUD operations for books
└── books-app/      # Next.js frontend application
````

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React.js (with Next.js)
- **Other**: TypeScript, Material UI, REST APIs

## ✨ Features

- **Create** new book notes
- **Read** details of a single book or all books for a user
- **Update** existing book notes
- **Delete** a book note
- **User association** with each book

## 📦`book-api` — Backend Overview

The `book-api` contains:

- **Models**: Mongoose schemas for books and users
- **Controllers**: Express route handlers
- **Services**: Business logic for interacting with the database
- **Routes**: API endpoints

## Book Model

```typescript

const bookSchema: Schema = new mongoose.Schema(
  {
    isbn: { type: String, required: true, unique: true },
    notes: { type: String, default: null },
    rating: { type: Number, min: 0, max: 5, default: null },
    readDate: { type: Date, default: null },
    summary: { type: String },
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

````

## API Endpoints

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/api/books`           | Create a new book        |
| GET    | `/api/books/:id`       | Get a single book by ID  |
| GET    | `/api/books?userId=...`| Get all books for a user |
| PUT    | `/api/books/:id`       | Update a book by ID      |
| DELETE | `/api/books/:id`       | Delete a book by ID      |

## 🧪Getting Started

### 1. Clone the repo

```bash

git clone https://github.com/abujanda/books.git
cd books
````
### 2. Install dependencies for both projects

```bash
cd book-api
npm install
cd ../book-app
npm install
````

### 3. Set up environment variables
Each project has its own `.env.example` file. Rename to .env and fill in appropriate values.

### 4. Run the projects
Start the backend:

```bash
cd book-api
npm run dev
````
Start the frontend:
```bash
cd ../book-app
npm run dev
````

## 📌 Future Enhancements

- User authentication and protected routes
- Tagging or categorizing books
- Search and filter capabilities
