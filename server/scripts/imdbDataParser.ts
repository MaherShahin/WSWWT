import fs from 'fs';
import Papa from 'papaparse';
import client from '../src/elastic/client';  // Assuming the path is correct

const PATH_TO_IMDB_DATA = '/home/maher/Downloads/title.basics.tsv';

const BATCH_SIZE = 5000;  // Index in batches of 5000 movies
let movieBatch: any[] = [];

const readStream = fs.createReadStream(PATH_TO_IMDB_DATA, 'utf8');

Papa.parse(readStream, {
    delimiter: '\t',
    header: true,
    dynamicTyping: true,
    step: (results: Papa.ParseResult<unknown>) => {
        movieBatch.push(results.data);

        // When batch reaches the set size, index it and clear the batch
        if (movieBatch.length >= BATCH_SIZE) {
            indexMovies(movieBatch);
            movieBatch = [];
        }
    },
    complete: () => {
        // Index any remaining movies in the batch
        if (movieBatch.length > 0) {
            indexMovies(movieBatch);
        }
    }
});

async function indexMovies(movies: any[]) {
  const body = movies.flatMap((movie) => [
    { index: { _index: 'movies' } },
    movie
  ]);

  await client.bulk({ refresh: true, body });
}
