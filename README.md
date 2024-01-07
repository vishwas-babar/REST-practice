# Server Project

This project is a simple server built using Express for handling user data. It provides basic CRUD (Create, Read, Update, Delete) functionality for a list of users. The server is implemented in Node.js and uses a mongodb to store the data.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/vishwas-babar/REST-practice
```
2. Install the dependencies:

```bash
npm install express dotenv nodemon mongoose
```
## Configuration

This project uses environment variables for configuration. To set them up:

1. Create a `.env` file in the root directory of the project.
2. In the `.env` file, set the `PORT` variable to the port you want the server to run on and also add the `DB_STRING` For example:

```env
PORT=4500
DB_STRING=YOUR_MONGODB_DATABASE_STRING
```

## API Endpoints

This API has the following endpoints:

- `GET /users`: get all users in html format
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user by ID
- `POST /api/users`: Create a new user
- `PATCH /api/users/:id`: Update an existing user
- `DELETE /api/users/:id`: Delete a user

You can use these endpoints to perform CRUD operations on the users. For the `POST` and `PATCH` requests, you need to provide the user data in the request body in JSON format.

## Testing

This API has been tested using Postman. You can manually test the API endpoints using Postman.

To test the API:

1. Open Postman.
2. Create a new request.
3. Set the request method (GET, POST, PATCH, DELETE) and enter the API endpoint URL.
4. If the request requires a body (for POST and PATCH requests), choose the "x-www-form-urlencoded" option and enter the data in the "Body" tab.
5. Click "Send" to send the request to the API.

Repeat these steps for each API endpoint you want to test..

## Contributing

Contributions are always welcome! Please ensure your pull request adheres to the following guidelines:

- Make sure your code follows the existing style.
- Ensure your code has been properly tested and all tests pass.
- Update the documentation with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
- Make sure your changes do not break any existing functionality.
- Create a pull request that is not too large and provide a clear explanation of the changes.

Thank you for your contributions!
