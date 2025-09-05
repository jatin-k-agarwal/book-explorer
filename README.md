# Book Explorer

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) installed and running locally or accessible remotely

---

### 1. Install Dependencies

#### Backend
```bash
cd backend
npm install
Frontend
```
```bash


cd frontend
npm install
```
Scraper (if separate)
```
cd scraper
npm install
```
```bash

cd scraper
npm install
```
2. Run the Scraper
Note: The scraper collects book data and populates the MongoDB database.

```bash

cd scraper
node scraper.js
```
Make sure your MongoDB server is running before running the scraper.

3. Start the Backend Server
```bash

cd backend
# (Optional) Set environment variable for MongoDB URI if not default:
# export MONGO_URI="your_mongodb_connection_string"

node server.js
```
The backend server will start on port 3000 by default. You should see:


```
MongoDB connected
Backend server running on port 3000
```
4. Launch the Frontend Application
```bash

cd frontend
npm start
```
This will start the React development server, usually accessible at http://localhost:3000.



Additional Notes

Ensure MongoDB is running before starting the scraper or backend.

The backend API is available at http://localhost:3000/api/books.

Use the frontend UI to search, filter, and browse books.



If you encounter any issues, check the console logs for errors and verify your MongoDB connection settings.


```

---

Let me know if you want me to help you customize this further or add troubleshooting tips!
```
