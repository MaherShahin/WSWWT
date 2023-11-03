import { CustomError } from "../../errors/CustomError";
import fetch from "node-fetch";
import { TMDBApiErrorCodes } from "../../constants/ErrorCodes";
import config from 'config'

class TMDBApi {
    private static readonly BASE_URL = "https://api.themoviedb.org/3";
    private static readonly TMDB_TOKEN = config.get("TMDB_TOKEN")

    private static async fetchFromTMDB(endpoint: string, body?: any): Promise<any> {

        if (!TMDBApi.TMDB_TOKEN) {
            throw new CustomError(
                400,
                TMDBApiErrorCodes.INVALID_TMDB_TOKEN,
                "TMDB_TOKEN not found in environment variables.",
              );
        }

        const url = `${TMDBApi.BASE_URL}${endpoint}`;

        const headers = {
            accept: "application/json",
            Authorization: TMDBApi.TMDB_TOKEN,
        };

        const options: any = {
            method: "GET",
            headers,
        };

        console.log("url", url);

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new CustomError(
                400,
                TMDBApiErrorCodes.TMDB_API_ERROR,
                "Error fetching data from TMDB.",
              );
        }

        const data = await response.json();

        console.log("data", data);
        return data;
    }

    public static async getMovieByImdbId(imdbId: string): Promise<any> {
        const endpoint = `/find/${imdbId}?external_source=imdb_id`;
        
        return TMDBApi.fetchFromTMDB(endpoint);
    }

    public static async searchMovies(query: string, page: number = 1): Promise<any> {
        const endpoint = `/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`;
        return TMDBApi.fetchFromTMDB(endpoint);
    }
    

}

export default TMDBApi;
