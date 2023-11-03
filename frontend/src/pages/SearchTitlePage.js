import React, { useState, useEffect } from 'react';
import { useApi } from "../api/useApi";
import ApiResponse from "../api/ApiResponse";
import TitleCard from "../components/TitleCard/TitleCard";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

export const SearchTitlePage = () => {
    const [movies, setMovies] = useState([]);
    const { request } = useApi();
    const navigate = useNavigate();

    // Getting the query parameter from the URL
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await request({
                    method: 'POST',
                    url: '/title/search-titles/',
                    data: { query }
                });

                console.log('response', response);
                
                if (response instanceof ApiResponse) {
                    const results = response.getData().results;

                    setMovies(results);
                } else {
                    console.error('Unexpected response:', response);
                }
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    return (
        <Box padding={2}>
            <h1>Search Results for: {query}</h1>
            <Grid container spacing={2}>
                {movies && movies.length > 0 && movies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <TitleCard title={movie} isOwner={false} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
