import fs from 'fs';
import Papa from 'papaparse';
import client from '../src/services/elastic/elasticClient'; 

const PATH_TO_IMDB_DATA = './imdb_datasets/title.basics.tsv';

const BATCH_SIZE = 5000;  
let movieBatch: any[] = [];

const readStream = fs.createReadStream(PATH_TO_IMDB_DATA, 'utf8');

// Check if the index exists or not before running the script
client.indices.exists({ index: 'movies' }).then((exists: any) => {
    if (exists) {
        console.log('Index already exists!');
    } else {
        Papa.parse(readStream, {
            delimiter: '\t',
            header: true,
            dynamicTyping: true,
            step: (results: Papa.ParseResult<unknown>) => {
                movieBatch.push(results.data);
        
                if (movieBatch.length >= BATCH_SIZE) {
                    indexMovies(movieBatch);
                    movieBatch = [];
                }
            },
            complete: () => {
                if (movieBatch.length > 0) {
                    indexMovies(movieBatch);
                }
            }
        });
    }
});


async function indexMovies(movies: any[]) {
  const body = movies.flatMap((movie) => [
    { index: { _index: 'movies' } },
    movie
  ]);

  await client.bulk({ refresh: true, body });
}
