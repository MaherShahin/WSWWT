# WSWWT (Frontend)

Welcome to the frontend component of the WSWWT Project. This application is designed to make selecting movies and series for your next viewing session easy and enjoyable. Whether you're collaborating with your roommates or exploring titles on your own, Comfort Series Selector has you covered.

## Quick Start

To run the frontend of WSWWT, follow these steps:

1. Make sure you have Node.js and npm installed on your system.
2. Clone this repository to your local machine:

   ```bash
   git clone git@github.com:MaherShahin/WSWWT.git
   cd WSWWT/frontend
   ```

3. Install the project's dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

Open your browser and navigate to http://localhost:3000 to access the Frontend.

Dependencies
Comfort Series Selector relies on various libraries and packages to bring its features to life. Here are some of the key dependencies:

- @emotion/react and @emotion/styled for advanced styling capabilities.
- @mui/material and @mui/icons-material for UI components.
- @reduxjs/toolkit and react-redux for state management.
- react-query for data fetching and caching.
- axios for making HTTP requests.
- react-router-dom for client-side routing.

## Application Structure

The main application file is `App.js`, where you can explore the project's structure, routes, and key components. The code is organized into directories and files as follows:

- **api**: Contains utility functions for working with APIs, currently being migrated to use `react-query`.
- **components**: Includes reusable UI components, organized into subdirectories.
- **hooks**: Custom hooks used in the application.
- **pages**: React components for different pages of the application.
- **redux**: Redux store configuration and slices for rooms and user data.
- **services**: Services for user authentication, friend management, and rooms.
- **styles**: CSS files for styling components.

### To Do

Here are some improvements and tasks that can be done to enhance the project structure and maintainability:

- [ ] Migrate all API queries to use `react-query` for improved data fetching and caching.
- [ ] Implement pagination to handle large lists of titles more efficiently.
- [ ] Refactor components to remove logic and move it into custom hooks for better code organization.
- [ ] Apply the standard API response class to handle responses from the backend consistently and gracefully.
