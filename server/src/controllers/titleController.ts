import { Response, NextFunction } from "express";
import Request from "../types/Request";
import { handleApiResponse } from "../utils/apiUtils";
import { ApiResponse } from "../types/ApiResponse";
import { ValidationError } from "../errors/ValidationError";
import { TitleService } from "../services/titleService";
import { TMDBApiErrorCodes } from "../constants/ErrorCodes";
import { CustomError } from "../errors/CustomError";

export class TitleController {
  static search = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const { query } = req.body;

      if (!query) {
        throw new ValidationError("You need to provide a search query");
      }

      const results = await TitleService.getTopHits(query);

      console.log(results);

      if (!results.hits || results.hits.total === 0) {
        return new ApiResponse("No movies found", []);
      }

      // filter out any duplicates - this stays here until the duplicate bug in Elasticsearch is fixed
      const filteredTitles = results.hits.hits.filter(
        (title: any, index: number, self: any) =>
          index ===
          self.findIndex((t: any) => t._source.tconst === title._source.tconst)
      );

      const titles = filteredTitles.map((title: any) => {
        return {
          id: title._source.tconst,
          title: title._source.primaryTitle,
          year: title._source.startYear,
          runtime: title._source.runtimeMinutes,
        };
      });


      return new ApiResponse("Movies retrieved successfully", titles);
    }
  );

  static getTitle = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      console.log("id", id);

      if (!id) {
        throw new ValidationError("You need to provide a movie id");
      }

      const title = await TitleService.getTitle(id);

      return new ApiResponse("Movie retrieved successfully", title);
    }
  );

  static searchTitles = handleApiResponse(
    async (req: Request, res: Response, next: NextFunction) => {
      const { query, page = 1 } = req.body;

      console.log("query", query);

      if (!query) {
        return next(
          new CustomError(
            400,
            TMDBApiErrorCodes.INVALID_IMDB_ID,
            "Query string is required.",
          )
        );
      }

      const result = await TitleService.searchTitles(query as string, Number(page));

      console.log("result in controller");

      return new ApiResponse("Movies retrieved successfully", result);
    }
  );

}
