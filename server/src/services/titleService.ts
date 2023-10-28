import { DatabaseError } from "../errors/DatabaseError";
import esClient from "../elastic/client";

export class TitleService {

    static async getTopHitsElastic(query: any) {

        await esClient.ping().then(() => {
            console.log('Elasticsearch is up and running!');
        }).catch((error: any) => {
            throw new DatabaseError("Elasticsearch is down", error);
        });

        await esClient.indices.exists({ index: "movies" }).then((exists: any) => {
            if (!exists) {
                throw new DatabaseError("Index does not exist");
            }
        });

        var results = null;

        try {
            results = await esClient.search({
                index: "movies",
                body: {
                  query: {
                    match_phrase_prefix: { primaryTitle: query },
                },
              }
              });
        } catch (error) {
            throw new DatabaseError("Error searching for movies", error);
        }

        console.log(results);

        return results;
      }
}
