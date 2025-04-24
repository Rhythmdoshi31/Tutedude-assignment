# Progress Tracking Application

This application allows users to track their progress while watching content. The backend API allows users to store their progress data, which consists of `userId`, `lastWatchedTime`, and `watchedIntervals`.

## Key Features
- Track watched intervals for users.
- Merge watched intervals to calculate unique progress.
- Retrieve and delete user progress.

## Installation

### Backend Setup

## Prerequisites
    Node.js
    npm (Node Package Manager)
    MongoDB (local or MongoDB Atlas)
    .env file for environment variables (MongoDB URI)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/progress-tracking-app.git
    
2. Navigate to the project directory:
    ```bash
    cd progress-tracking-app

3. Install backend dependencies:
    ```bash
    cd server
    npm install

4. Create a .env file in the server folder and set your MongoDB URI:
    ```bash
    MONGODB_URI=your_mongodb_connection_string

5. Start the backend server:
    ```bash 
    npm start

### Frontend Setup

## Prerequisites
    Node.js
    npm (Node Package Manager)

1. Navigate to the Frontend Directory:
    ```bash
    cd tutedude-assignment/frontend

2. Install Dependencies:
    ```bash
    npm install

3. Start the Development Server:
    ```bash
    npm run dev

Your frontend will now be running at http://localhost:3000.



# API Documentation

## Overview
This document outlines the API endpoints for the **Progress Tracking** application. The backend is built with **Node.js** and uses **MongoDB** for data persistence. The API allows users to save, retrieve, and delete progress data related to content watched, along with the time intervals.

## Base URL
The backend server is running at `http://localhost:5000`.

---

## Endpoints

### 1. **POST `/progress`**
This endpoint saves or updates a user's progress, including the time intervals they've watched.

#### Request

- **URL**: `/progress`
- **Method**: `POST`
- **Body (JSON)**:
    ```json
    {
      "userId": "string", 
      "lastWatchedTime": "number",
      "watchedIntervals": [
        {"start": "number", "end": "number"},
        {"start": "number", "end": "number"}
      ]
    }
    ```

#### Request Parameters
- `userId`: The unique identifier of the user.
- `lastWatchedTime`: The timestamp of the last time the user watched content.
- `watchedIntervals`: An array of objects, where each object contains:
    - `start`: The start time of the interval.
    - `end`: The end time of the interval.

#### Response

- **200 OK**:
    ```json
    {
      "message": "Progress saved successfully"
    }
    ```
- **400 Bad Request**: If any required data is missing or invalid.
    ```json
    {
      "error": "Missing or invalid data"
    }
    ```
- **500 Internal Server Error**: If there's an issue with saving the progress.
    ```json
    {
      "error": "Failed to save progress"
    }
    ```

---

### 2. **GET `/progress/:userId`**
This endpoint retrieves a user's progress based on their `userId`.

#### Request

- **URL**: `/progress/:userId`
- **Method**: `GET`
- **Parameters**:
    - `userId`: The unique identifier of the user (in the URL).

#### Response

- **200 OK**: If the user progress exists.
    ```json
    {
      "userId": "userId",
      "lastWatchedTime": "number",
      "watchedIntervals": [
        {"start": "number", "end": "number"},
        {"start": "number", "end": "number"}
      ]
    }
    ```
- **200 OK**: If no progress exists for the user, returns an empty set.
    ```json
    {
      "userId": "userId",
      "lastWatchedTime": 0,
      "watchedIntervals": []
    }
    ```

- **404 Not Found**: If the user progress data does not exist.

    ```json
    {
      "message": "User progress not found"
    }
    ```

---

### 3. **DELETE `/progress/:userId`**
This endpoint deletes a user's progress.

#### Request

- **URL**: `/progress/:userId`
- **Method**: `DELETE`
- **Parameters**:
    - `userId`: The unique identifier of the user (in the URL).

#### Response

- **200 OK**: If the progress was successfully deleted.
    ```json
    {
      "message": "Progress cleared successfully"
    }
    ```
- **404 Not Found**: If no progress was found to delete for the given user.
    ```json
    {
      "message": "No progress found to delete"
    }
    ```
- **500 Internal Server Error**: If there's an issue with deleting the progress.
    ```json
    {
      "error": "Failed to clear progress"
    }
    ```

---

## Error Handling
The API will respond with the following error codes:

- **400 Bad Request**: Missing or invalid data in the request body.
- **404 Not Found**: The resource (user progress) was not found.
- **500 Internal Server Error**: A problem occurred on the server while processing the request.

---

## Example Usage

### Example: Saving Progress

**Request**:

```bash
POST /progress
Content-Type: application/json
{
  "userId": "12345",
  "lastWatchedTime": 1623157890,
  "watchedIntervals": [
    {"start": 0, "end": 5},
    {"start": 10, "end": 15}
  ]
}

