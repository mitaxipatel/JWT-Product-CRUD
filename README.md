# User and Product Management API

## Overview

This project is a RESTful API for user registration, authentication, and product management. It allows authenticated users to perform CRUD (Create, Read, Update, Delete) operations on products while providing a secure authentication mechanism using JSON Web Tokens (JWT).

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and product data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcrypt**: Library for hashing passwords.
- **JSON Web Token (JWT)**: For user authentication.

## Features

- **User Registration**: Users can create an account with an email and password.
- **User Login**: Users can log in to the system and receive a JWT for authentication.
- **Product Management**: Authenticated users can create, read, update, and delete products.
- **Secure Endpoints**: All product operations are protected and require a valid JWT.

## API Endpoints

### User Endpoints

- **Register User**
  - **POST** `/users/adduser`
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

- **Login User**
  - **POST** `/users`
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

### Product Endpoints

- **Create Product**
  - **POST** `/products`
  - **Headers**:
    - `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Request Body**:
    ```json
    {
      "productName": "Sample Product",
      "description": "This is a sample product.",
      "price": 29.99,
      "category": "Electronics",
      "stockQuantity": 100
    }
    ```

- **Get All Products**
  - **GET** `/products`
  - **Headers**:
    - `Authorization: Bearer YOUR_JWT_TOKEN`

- **Get Product by ID**
  - **GET** `/products/:id`
  - **Headers**:
    - `Authorization: Bearer YOUR_JWT_TOKEN`

- **Update Product**
  - **PUT** `/products/:id`
  - **Headers**:
    - `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Request Body**:
    ```json
    {
      "productName": "Updated Product",
      "description": "This is an updated sample product.",
      "price": 19.99,
      "category": "Electronics",
      "stockQuantity": 150
    }
    ```

- **Delete Product**
  - **DELETE** `/products/:id`
  - **Headers**:
    - `Authorization: Bearer YOUR_JWT_TOKEN`

