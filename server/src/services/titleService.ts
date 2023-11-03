import { DatabaseError } from "../errors/DatabaseError";
import esClient from "../elastic/client";
import TMDBApi from "../tmdb/tmdbAPI";

export class TitleService {
  static async getTopHits(query: any) {
    return await this.getTopHitsElastic(query);
  }

  static async getTopHitsElastic(query: any) {
    await esClient
      .ping()
      .catch((error: any) => {
        throw new DatabaseError("Elasticsearch is down", error);
      });

    await esClient.indices.exists({ index: "movies" }).then((exists: any) => {
      if (!exists) {
        throw new DatabaseError("Index does not exist");
      }
    });

    var results = null;

    results = await esClient.search({
      index: "movies",
      body: {
        query: {
          bool: {
            must: [
              {
                match_phrase_prefix: {
                  primaryTitle: query,
                },
              },
              {
                range: {
                  startYear: {
                    gte: 2000, // Greater than or equal to 2000
                  },
                },
              },
              {
                range: {
                  runtimeMinutes: {
                    gte: 20, // Greater than or equal to 20
                  },
                },
              },
              {
                terms: {
                  titleType: ["movie", "tvseries"], // Must match one of the specified values
                },
              },
            ],
          },
        },
      },
    } as any);
     
    return results;
  }

  static async getTitle(id: string) {
    const response = await TMDBApi.getMovieByImdbId(id);

    return response;
  }

  static async searchTitles(query: string, page: number): Promise<any> {
    return TMDBApi.searchMovies(query, page);
}
}
