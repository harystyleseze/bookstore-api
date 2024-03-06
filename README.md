# Bookstore API

## Overview

This project is a RESTful API for a bookstore application. It's built using Node.js, Express, TypeScript, and MongoDB. The API allows managing books, authors, and categories, providing functionalities to create, read, update, and delete (CRUD operations) for each entity.

## Getting Started

### Prerequisites

- Node.js
- npm/express/ts/express
- MongoDB

## Running the Application

### Compile TypeScript to JavaScript:

`npm run build`

### Start the server:

`npm start`
The server will start running on http://localhost:3000.

### Running the Application

`npm run dev`

### Testing the Application

`npm test`

## API Documentation

### Author

- Create an author - `POST /api/authors`
- Get All authors - `GET /api/authors`
- Get author by ID - `GET /api/authors/:id`
- Update a author - `PUT /api/authors/:id`
- Delete a author - `DELETE /api/authors/:id`

### Books

- Create a Book - `POST /api/books`
- Get All Books - `GET /api/books`
- Get Book by ID - `GET /api/books/:id`
- Update a Book - `PUT /api/books/:id`
- Delete a Book - `DELETE /api/books/:id`

Note: Creating a book requires valid `author` and `category` IDs referring to existing entities in the database.

### Categories

- Create a Categories - `POST /api/categories`
- Get All Categories - `GET /api/categories`
- Get Category by ID - `GET /api/categories/:id`
- Update a Categories - `PUT /api/categories/:id`
- Delete a Categories - `DELETE /api/categories/:id`

## Project Structure

- `src/`
  - `models/`: Mongoose models for entities.
  - `routes/`: Endpoint definitions.
  - `app.ts`: Application setup and entry point.
- `tests/`: Test suite for the API (Still pending bacause I am currently facing an issue parsing the test file and the deadline is tight)
- `jest.config.js`: Jest configuration.
- `tsconfig.json`: TypeScript compiler options.

## Design Decisions

1. Modular Architecture: Separation of concerns among models and routes for maintainability.
2. TypeScript and npm: Provides type safety and enhances developer experience.
3. Testing: Integration tests ensure reliability of the API endpoints.
