
# TinyKitchen

TinyKitchen is a recipe website where users can view and manage recipes. Currently, the application only runs locally and is powered by a Vue.js frontend and a Node.js backend with MongoDB as the database.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Running the Application Locally](#running-the-application-locally)

## Features
- Recipe management (add, update, delete recipes).
- View and search for recipes by ingredients or categories.
- MongoDB for database storage.

## Getting Started
To run TinyKitchen locally, you need to have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [MongoDB](https://www.mongodb.com/atlas/database) (or MongoDB Atlas)
- [Git](https://git-scm.com/)

### Clone the Repository
To get a copy of the project up and running, you need to clone the repository:

```bash
git clone https://github.com/Burq11/TinyKitchen.git
```

### Running the Application Locally

1. **Install Backend Dependencies**:
   Navigate to the `backend` directory and install the required dependencies for the Node.js server:

   ```bash
   cd backend
   npm install
   ```
2. Set Up Environment Variables: Create a .env file in the backend directory and add your MongoDB connection string. The .env file should look like this:
  ```bash
  MONGO_CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tinykitchen?retryWrites=true&w=majority
  ```
3. Start the Backend: Run the Node.js server:
  ```bash
    node index.js
  ```
The backend server should now be running on http://localhost:3000.

4. Install Frontend Dependencies: Open a new terminal window, navigate to the frontend directory, and install the Vue.js dependencies:
```bash
  cd frontend
  npm install
```
5. Access the Application: Open your browser and go to http://localhost:3000 to view the app.





