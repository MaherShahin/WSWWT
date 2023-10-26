import esClient from "../src/elastic/client";

async function searchMovies(query: string) {
    const results = await esClient.search({
      index: 'movies',
      body: {
        query: {
          match: { primaryTitle: query }
        }
      }
    });

    console.log(results)

    results.hits.hits.forEach((hit: any) => {
        console.log(hit);
    });
  }


  