# WSWWT IMDb Project

The WSWWT IMDb Project is a comprehensive application that uses IMDb data to provide users with a searchable platform for movie titles. With a frontend for user interaction, a backend server for data processing, and Elasticsearch for efficient data storage and search, it ensures a seamless experience for movie enthusiasts.

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


## IMDb Data Indexing and Elasticsearch Structure

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

### More information are provided in the respective README inside the server and frontend directories