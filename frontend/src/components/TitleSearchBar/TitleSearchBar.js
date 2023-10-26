import React, { useState, useEffect } from 'react';
import { useApi } from '../../api/useApi';

export const TitleSearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { request } = useApi();
  const DEBOUNCE_DELAY = 300;

  useEffect(() => {
    const handleDebouncedSearch = async () => {
      try {
        const response = await request({
          method: 'POST',
          url: `/title/search`,
          data: { query },
        });
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const timerId = setTimeout(() => {
      if (query) {
        handleDebouncedSearch();
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timerId);
  }, [query, request]);

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
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
