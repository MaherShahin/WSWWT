import { Response, NextFunction } from "express";
import Request from "../types/Request";
import { handleApiResponse } from "../utils/apiUtils";
import esClient from "../elastic/client";
import { ApiResponse } from "../types/ApiResponse";
import { ValidationError } from "../errors/ValidationError";

export class TitleController {
  static search = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const { query } = req.body;

      if (!query) {
        throw new ValidationError("You need to provide a search query");
      }

      const results = await esClient.search({
        index: "movies",
        body: {
          query: {
            match_phrase_prefix: { primaryTitle: query },
        },
      }
      });


      if (!results.hits || results.hits.total === 0) {
        return new ApiResponse("No movies found", []);
      }
      const filteredTitles = results.hits.hits.filter((hit: any) => hit._source.startYear > 2000);
      const titles = filteredTitles.map((title: any) => title._source.primaryTitle);

      return new ApiResponse("Movies retrieved successfully", titles);
    }
  );
}
