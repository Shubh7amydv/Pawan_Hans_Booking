# Authorization Microservice

This service provides authentication and authorization functionality for backend applications using JWT-based authentication and Role-Based Access Control (RBAC). It is designed to be used as an independent authorization layer in a microservices architecture or alongside a headless CMS.

---

## Features

- User registration and login
- Secure password hashing
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Middleware-based route protection
- Environment-based configuration
- Easy integration with other backend services

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL / MySQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcrypt
- dotenv

---

## Project Structure

authorization-service/
├── src/
│   ├── config/          Environment and database configuration
│   ├── controllers/     Request handlers
│   ├── middlewares/     Authentication and authorization logic
│   ├── models/          Database models
│   ├── routes/          API routes
│   ├── services/        Business logic
│   └── index.js         Application entry point
├── .env.example
├── package.json
└── README.md

---

## Authentication Flow

1. User registers using email and password
2. Password is hashed before storing in the database
3. User logs in with valid credentials
4. A JWT token is generated and returned
5. Client sends the token in the Authorization header
6. Protected routes validate the token using middleware

Authorization Header:
Authorization: Bearer <JWT_TOKEN>

---

## Role-Based Access Control (RBAC)

Roles are used to restrict access to APIs based on user permissions.

Example roles:
- ADMIN
- USER

Access to protected routes is controlled using role-check middleware after successful authentication.

---

## API Endpoints

Auth Endpoints:
- POST /auth/register   Register a new user
- POST /auth/login      Login and receive JWT token

Protected Endpoints:
- GET /users/profile    Authenticated users only
- GET /admin/data       Admin access only

---

## Environment Variables

Create a .env file with the following values:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_db
JWT_KEY=your_jwt_secret

---

## Running the Service

npm install
npm run dev

The server will start on http://localhost:3000

---

## Testing

- APIs can be tested using Postman
- JWT token must be sent in request headers for protected routes

---

## Use Case

This authorization service can be used as:
- A centralized auth service for microservices
- An authentication layer for frontend applications
- An authorization provider integrated with a Headless CMS (e.g., Directus)

---

## Author

Shubham Yadav  
Backend Developer | Node.js | Databases
