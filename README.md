# MovieMate React App

myFlix is a single-page, responsive web application built with React that allows users to explore and manage information about their favorite movies. The app connects to a server-side API that provides movie data and user management features. This project is part of a full-stack JavaScript development course and showcases skills in client-side development using the MERN (MongoDB, Express, React, and Node.js) stack.

## Features

- **Main View**: 
  - Displays a list of all movies with images, titles, and descriptions.
  - Allows users to add the movie to their list of favorites.
  - Search feature to filter movies.
  - Option to view detailed information about a selected movie.
  - Navigation to user profile and logout options.

- **Single Movie View**:
  - Provides detailed information about a movie, including its genre, director, actors, and a brief description.
  - Displays additional movie details such as release date, movie run-time, ratings, and age restrictions.
  - Allows users to add the movie to their list of favorites.

- **User Authentication**:
  - **Login View**: Users can log in using their username and password.
  - **Signup View**: New users can register with a username, password, email, and date of birth.

- **Profile Management**:
  - **Profile View**: Displays user details and a list of favorite movies.
  - Allows users to update their personal information.
  - Option to remove movies from favorites and to deregister from the service.

## Technical Requirements

- **Single-Page Application (SPA)**: The app is built as an SPA with state routing for navigation.
- **React and ES2015+**: The application is developed using the React library with modern JavaScript features.
- **Parcel**: The build tool used for bundling the app.
- **React Bootstrap**: Utilized for responsive UI design.
- **Function Components**: The app primarily uses function components for UI development.
- **Hosting**: The application is hosted online for easy access.

## Project Setup

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/lenachat/moviemate-client.git
   cd moviemate-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build the app for production:
   ```bash
   npm run build
   ```

## Deployment

The application is hosted online on Netlify and can be accessed at https://moviemate-online.netlify.app .