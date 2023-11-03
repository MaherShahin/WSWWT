# WSWWT IMDb Project

The WSWWT IMDb Project is more than just a movie title search platform. It's a collaborative tool designed to simplify the decision-making process and enhance your movie and series watching experience. With a frontend built using React (JavaScript), a backend server for data processing, and Elasticsearch for efficient data storage and search, it ensures a seamless experience for movie enthusiasts.

## Introduction

Tired of endless debates with your flatmates about what to watch? The WSWWT IMDb Project is here to save the day! This app is all about making your movie and series selection process easier and more enjoyable. Here's what you can do:

### Key Features

- **Room Creation**: Users can register and create rooms for their apartment, whether they want to keep it private or open it to the community.
- **Join Public Rooms**: Join public rooms with specific genres of movies and series, where you can discover new titles and like-minded users.
- **Title Sharing**: Add your favorite movie and series titles to the rooms, creating a shared watchlist. Think of them as collaborative playlists.
- **Randomizer**: When the decision-making process becomes overwhelming, just press the "Randomizer" button, and the app will select a movie or a random episode and season for you, saving you from debates and making the choice fun.


## Introduction

Do you and your flatmates often find yourselves in endless debates over what movie or series to watch? The WSWWT IMDb Project is here to save the day! This app is designed to make your movie night decisions easier and more enjoyable.

### Key Features

- **Room Creation**: Users can register and create rooms for their apartment, whether they want to keep it private or open it to the community.
- **Join Public Rooms**: Join public rooms with specific genres of movies and series, where you can discover new titles and like-minded users.
- **Title Sharing**: Add your favorite movie and series titles to the rooms, creating a shared watchlist.
- **Randomizer**: When the decision-making process becomes overwhelming, just press the "Randomizer" button, and the app will select a movie or a random episode and season for you, saving you from debates and making the choice fun.

## Setting Up the Development Environment Locally

### Preparing Your System

Before you start, ensure you have `Docker` and `Docker Compose` installed on your local machine.

### Clone the Repository

To get a local copy of the project, you'll need to clone the repository:

```bash
git clone git@github.com:MaherShahin/WSWWT.git
cd WSWWT
```

### Building and Starting the Services

With Docker Compose, setting up all necessary services is straightforward. Execute the following command:

```bash
docker-compose up --build
```

### Access the Local Development Environment

Once all services are up:

- **Frontend**: Open your browser and navigate to `http://localhost:3000`.
- **Server**: Accessible at `http://localhost:5000`.
- **Elasticsearch**: For those interested in direct Elasticsearch interactions, it's available at `http://localhost:9200`.


More information are provided in the respective READMEs inside the server and frontend directories

# Future Enhancements
The project's future includes exciting possibilities:

- Enhanced Recommendations: Refine the randomizer to provide more nuanced recommendations.
- Improved User Experience: Continuously enhance the user interface and user experience.

# License
This project is open-source and available under the MIT License.

Happy movie nights with the WSWWT IMDb Project!



