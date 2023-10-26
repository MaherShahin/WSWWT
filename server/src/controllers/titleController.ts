import { Response, NextFunction } from "express";
import Request from "../types/Request";
import { handleApiResponse } from "../utils/apiUtils";
import esClient from "../elastic/client";
import { ApiResponse } from "../types/ApiResponse";
import { ValidationError } from "../errors/ValidationError";

export class TitleController {
  static search = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {

        const { query } = req.body;  // Assuming you send the query in the request body

      if (!query) {
        throw new ValidationError("You need to provide a search query");
      }

      const results = await esClient.search({
        index: 'movies',
        body: {
          query: {
            match: { primaryTitle: query }
          }
        }
      });

      if (!results.hits || results.hits.total === 0) {
        return new ApiResponse("No movies found", []);
      }
      console.log(results)
      const titles = results.hits.hits.map((hit: any) => hit._source.primaryTitle);

      return new ApiResponse("Movies retrieved successfully", titles);
    },
  );
}
