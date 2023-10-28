import React, { useState, useEffect } from 'react';
import { useApi } from '../../api/useApi';

export const TitleSearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { request } = useApi();
  const DEBOUNCE_DELAY_MS = 300;

  useEffect(() => {
    const handleDebouncedSearch = async () => {
      try {
        const response = await request({
          method: 'POST',
          url: `/title/search`,
          data: { query },
        });
        console.log('response', response);
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const timerId = setTimeout(() => {
      if (query) {
        handleDebouncedSearch();
      }
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timerId);
  }, [query]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}> 
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
      </form>
      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
