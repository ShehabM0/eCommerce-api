# eCommerce API

A RESTful API for an eCommerce platform specializing in paintings and artwork. This API provides user authentication, product management, shopping cart functionality, purchase processing, and review system with role-based access control.

## Features

- **User Authentication**: Secure registration, login, and logout with JWT tokens
- **Product Management**: CRUD operations for paintings/artwork (admin only)
- **Shopping Cart**: Add, update, and manage items in user carts
- **Purchase System**: Process and track orders/purchases
- **Review System**: Users can leave reviews for products
- **Role-Based Access Control**: Admin and regular user roles with different permissions
- **Image Upload**: Support for product image uploads using Multer
- **User Wallet**: Built-in wallet system with default balance for users

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Environment Variables**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eCommerce-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DB_URL=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
node index.js
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Paintings (`/api/painting`)
- `POST /api/painting/create` - Create a new painting (Admin only)
- `GET /api/painting/getAll` - Get all paintings (Admin only)
- `GET /api/painting/get/:id` - Get a specific painting (Admin only)
- `PATCH /api/painting/update/:id` - Update a painting (Admin only)
- `DELETE /api/painting/delete/:id` - Delete a painting (Admin only)

### Cart (`/api/cart`)
- Endpoints for managing user shopping carts

### Purchase (`/api/purchase`)
- Endpoints for processing and managing purchases

### Review (`/api/review`)
- Endpoints for product reviews

### User (`/api/user`)
- Endpoints for user profile management

## Data Models

### User
- `username` (String, required, min 3 chars)
- `email` (String, required, unique, validated)
- `password` (String, required, hashed)
- `city` (String, required)
- `state` (String, required)
- `phone_number` (String, required, validated)
- `money` (Number, default: 10000)
- `address` (String, optional)
- `admin` (Boolean, default: false)

### Painting
- `title` (String, required, max 50 chars)
- `categories` (Array, required)
- `price` (Number, required)
- `image` (String, required)
- `quantity` (Number, required)
- `description` (String, required, max 1000 chars)
- `timestamps` (createdAt, updatedAt)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, a token is issued and should be included in subsequent requests. The token can be sent via:
- Cookie (automatic with cookie-parser)
- Authorization header

Protected routes require the `verifyToken` middleware, and admin-only routes require both `verifyToken` and `admin` middleware.

## File Uploads

Product images are uploaded using Multer and stored in the `uploads/` directory. The images are served statically and accessible via the Express static middleware.

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization (admin/user)
- Input validation on models
- Secure cookie handling

## Development

To run the development server:
```bash
node index.js
```

## License
MIT License - see [LICENSE](LICENSE) file for details
