# WSWWT Server

![Node.js](https://img.shields.io/badge/Node.js-%5E16.13.1-68A063)
![Express.js](https://img.shields.io/badge/Express.js-%5E4.17.1-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-%5E4.8.4-3178C6)
![MongoDB](https://img.shields.io/badge/MongoDB-%5E6.12.0-47A248)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-%5E8.10.0-005571)
![Jest](https://img.shields.io/badge/Jest-%5E29.6.4-C21325)
![Mongoose](https://img.shields.io/badge/Mongoose-%5E6.12.0-880)
![Build Status](https://img.shields.io/badge/Build-Passing-4BC51D)

### Table of Contents
- [Getting Started](#getting-started)
  - [Configuration Setup](#configuration-setup)
  - [Running the Server](#running-the-server)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Coding Conventions](#coding-conventions)
  - [Route Structure](#route-structure)
  - [Controller Methods](#controller-methods)
  - [Response Classes](#response-classes)
  - [Error Handling](#error-handling)
- [IMDb Data Indexing and Elasticsearch Structure](#imdb-data-indexing-and-elasticsearch-structure)



# Getting Started

To get started with this project, follow the steps below:

## Configuration Setup

1. Locate the `config` folder in your project's root directory.
2. Inside the `config` folder, you'll find a file named `config.skel.json`. Make a copy of this file and rename it to `config.json`.

   ```bash
   cp config/config.skel.json config/config.json
   ```
3. Open the newly created config.json file and fill in the required configuration values for your project, such as API keys for the TMDB API, MongoDB database URLs, and any other environment-specific settings.

## Running the server
```bash
  npm run server
```

For detailed deployment instructions, refer to the README in the higher-level directory that contains both the server and the frontend.

# Project Structure

The project follows a structured directory layout to enhance maintainability and code organization. Here's a brief overview of the main high-level directories:

- **`constants`**: Contains error codes and other constants used throughout the project.

- **`controllers`**: Contains controller classes responsible for handling various API endpoints. More information about how the controller methods should be created is provided later.

- **`errors`**: Contains custom error classes that help in providing meaningful error messages and handling various error scenarios more effectively.

- **`middleware`**: Houses middleware modules responsible for request and response processing. Global middlewares include the error handling middleware. Also contains some of the validation middleware

- **`models`**: Defines the models used in the application. 

- **`routes`**: Route definitions for the API

- **`services`**: Service classes to implement the business logic. Also includes the tmdb folder which encapsulates all logic related to requests done to the tmdb api, as well as the elastic folder which contains the logic related to the elasticsearch client.


- **`types`**: Defines TypeScript type definitions used throughout the project. e.g. the common ApiResponse, ApiErrorResponse classes which ensure a standard response structure throughout the backend 

- **`utils`**: Contains utility functions that are used across the project. E.g. encryption utilities, as well as some api related wrapper functions


# Coding Conventions

This project follows a set of coding conventions to maintain consistency and improve code quality. Most importantly, the section with the api response classes and the wrapper function ensures consistency throughout the api and makes it significantly easier for the client to handle all responses, successful or not.

## Route Structure

Routes in this project are organized to ensure clarity and enforce security. The positioning of the `authMiddleware` middleware determines whether routes are protected or unprotected.

Example route structure:
```javascript
import { Router } from "express";
import { UserController } from "../../controllers/userController";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

// Unprotected routes
router.get("/find/:id", UserController.getUserById);

// Use authMiddleware to protect subsequent routes
router.use(authMiddleware);

// Protected routes
router.get("/rooms", UserController.getUserRooms);
router.put("/update", UserController.update);
router.delete("/delete", UserController.delete);
router.get("/search", UserController.searchUsers);

export default router;
```


## Controller Methods
All controller methods in this project are expected to be static and wrapped with the handleApiResponse wrapper function. This wrapper function ensures that methods return an object of the type ApiResponse.

Example controller method:
```javascript
class UserController {
  static addTitle = handleApiResponse(async (req, res, next) => {
    // ... your controller logic ...
    return new ApiResponse("Title added successfully", result);
  });
}
```

The handleApiResponse wrapper simplifies error handling and ensures consistent responses. This convention is strictly followed for all controller methods.

## Response Classes

In this project, we use custom response classes to standardize the structure of API responses. These classes simplify the process of sending responses and error messages to clients.

### `ApiResponse`

The `ApiResponse` class is used for successful responses in your application. It provides a consistent format for delivering success messages and data to clients. All controller methods are expected to return an instance of `ApiResponse`.

The ApiResponse class takes the following parameters:

- message (string): A descriptive message for the response.
- payload (T): Data to be included in the response.
- status (number): HTTP status code (default is 200).
- errors (any): Error information (default is null). // Handled by error middleware


### `ApiErrorResponse`
The ApiErrorResponse class is used to handle errors and send standardized error responses. It is primarily used in the error middleware to handle errors thrown throughout the application.


## Error handling

The error handling system in this project is designed to catch and handle errors that extend the base type CustomError.

To ensure consistent error responses, make sure that any custom error types in your project extend the CustomError base class. It will handle creating the ApiErrorResponse by itself and sending it to the client.

For more information, check the error middleware in the middleware directory

# IMDb Data Indexing and Elasticsearch Structure
Some scripts that are mostly related to the initalization and testing of the elasticsearch instance and indexing, those are contained inside the scripts directory

### Off-The-Shelf IMDb Data Parsing

The WSWWT project leverages the vast IMDb dataset to create an Elasticsearch index. To achieve this, we have a dedicated script, `imdbDataParser.ts`, that efficiently reads and indexes the IMDb dataset into our Elasticsearch instance.

Here's a high-level overview:

1. The script uses the `papaparse` library to read and parse the `title.basics.tsv` dataset from IMDb.
2. As the dataset is large, the script processes the data in batches (defined by `BATCH_SIZE`, which is set to 5000).
3. Each movie title is indexed into Elasticsearch under the index named `movies`.

### Elasticsearch Index Structure

When you run the project, the IMDb data is indexed with the following fields:

- `tconst`: Alphanumeric unique identifier of the title.
- `titleType`: The type/format of the title (e.g. movie, short, tvseries, etc.).
- `primaryTitle`: The more popular title or the title used by the filmmakers on promotional materials at release.
- `originalTitle`: The original title in its original language.
- `isAdult`: Boolean indicating if the title is for adults (1 for adult titles, 0 otherwise).
- `startYear`: Release year of the title or the start year for TV series.
- `endYear`: End year for TV series; ‘\N’ for all other title types.
- `runtimeMinutes`: Primary runtime of the title in minutes.
- `genres`: Array that includes up to three genres associated with the title.

### Testing Elasticsearch Health and Verifying Index

You can quickly check the health of the Elasticsearch instance and verify if the `movies` index exists:

**Elasticsearch Health**: Navigate to `http://localhost:9200/_cluster/health` in your browser or use a tool like `curl`:
```bash
   curl http://localhost:9200/_cluster/health
```  