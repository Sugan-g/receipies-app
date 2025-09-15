# Recipes App

---

A CRUD application for managing recipes using Node.js, Express.js, and MongoDB (Mongoose). This project follows the MVC pattern and provides fully functional API endpoints tested via Postman.

---

## Features

- Create a new recipe
- Retrieve all recipes with optional filters and pagination
- Retrieve a single recipe by ID
- Update a recipe by ID
- Delete a recipe by ID
- Input validation and error handling
- Clean, modular, and scalable architecture

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Postman (for API testing)
- dotenv for environment variables
- express-validator for input validation

---

## Project Structure

```
recipes-app/
│
├─ controllers/       # Handles business logic
│   └─ recipeController.js
├─ models/            # Mongoose models
│   └─ recipe.js
├─ routes/            # Express routes
│   └─ recipes.js
├─ middlewares/       # Custom middlewares
│   └─ errorHandler.js
│   └─ validateRequest.js
├─ config/            # Database connection
│   └─ db.js
├─ app.js             # Entry point
├─ package.json
└─ .env               # Environment variables
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://<username>:<password>@localhost:27017/recipesdb?authSource=recipesdb

```

Replace `<username>` and `<password>` with your MongoDB credentials.

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd recipes-app
```

2. Install dependencies:

npm install
npm install express mongoose dotenv cors express-validator
npm install --save-dev nodemon

````

3. Start the server:

```bash
npm run dev
````

Server will run at `http://localhost:5000`.

---

## API Endpoints

### 1. Create Recipe

POST -- `/api/recipes`
Body (JSON):

```json
{
  "title": "Chocolate Cake",
  "ingredients": ["flour", "sugar", "cocoa powder", "eggs"],
  "steps": ["Mix ingredients", "Bake at 180°C for 30 minutes"],
  "tag": "Dessert",
  "difficulty": "Easy"
}
```

## Response:

```json
{
  "success": true,
  "data": { ...recipeObject }
}
```

2.  Get All Recipes

---

GET - `/api/recipes`
Query Parameters (optional):

```
page=1
limit=20
tag=Dessert
difficulty=Easy
```

## Response :

```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "data": [ ...recipesArray ]
}
```

---

3. Get Recipe by ID

GET `/api/recipes/:id`
Response:

---

```json
{
  "success": true,
  "data": { ...recipeObject }
}
```

---

4. Update Recipe

---

PATCH `/api/recipes/:id`
Body (JSON):

```json
{
  "title": "Vanilla Cake"
}
```

Response:

```json
{
  "success": true,
  "data": { ...updatedRecipeObject }
}
```

---

5. Delete Recipe

DELETE --`/api/recipes/:id`
Response:

---

```json
{
  "success": true,
  "message": "Recipe deleted"
}
```

---

6.Testing

- Use Postman to test all endpoints.
- You can create multiple recipes to test filters and pagination.

---
