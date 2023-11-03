import React, { useState, useEffect } from "react";
import { useApi } from "../../api/useApi";
import { TitleModal } from "../TitleModal/TitleModal";
import ApiResponse from "../../api/ApiResponse";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./TitleSearchBar.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const TitleSearchBar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const { request } = useApi();
  const DEBOUNCE_DELAY_MS = 300;

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate(); 
  const handleGoToSearchPage = () => {
    navigate(`/title-search?query=${query}`);
  };  
  
  const fetchMovieDetails = async (movie) => {
    try {
      const movieId = movie.id;
      console.log("movieId", movieId);

      const response = await request({
        method: "GET",
        url: `/title/get/${movieId}`,
      });

      if (!(response instanceof ApiResponse)) {
        console.log("response", response);
        return;
      }

      const title = response.getData();

      //TMDB API does not always return a movie for a given IMBD tconst
      //so we need to check if we got a movie back before setting the state

      console.log("response.data", response);

      if (title){
        if (title.movie_results && title.movie_results[0]){
          console.log("title.movie_results[0]", title.movie_results[0]);
          setSelectedTitle(title.movie_results[0]);
          setModalOpen(true);
        } else if (title.tv_results && title.tv_results[0]) {
          console.log("title.tv_results[0]", title.tv_results[0]);
          setSelectedTitle(title.tv_results[0]);
          setModalOpen(true);
        }
      } else {
        toast.error(
          "Our external provider could not find movie details for " +
            movie.title
        );
        setMovies(movies.filter((m) => m.id !== movie.id));
      }
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMovies([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await request({
          method: "POST",
          url: `/title/search`,
          data: { query },
        });
        console.log("response", response);
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const timerId = setTimeout(() => {
      if (query) {
        handleSearch();
      }
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(timerId);
  }, [query]);

  return (
    <div className="search-container" ref={searchRef}>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleGoToSearchPage();
            }
          }}
        />
      </div>
      {movies && movies.length > 0 && (
        <div className="search-results">
          <List sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 200,
          }}>
            {movies.map((movie) => (
              <ListItem
                button
                key={movie.id}
                onClick={() => fetchMovieDetails(movie)}
                sx={{ 
                  "&:hover": { backgroundColor: "#8e8e8e" },
                  cursor: "pointer",
              }}
              >
                <ListItemText primary={movie.title} />
              </ListItem>
            ))}
          </List>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleGoToSearchPage}
          >
            View More Results
          </Button>
        </div>
      )}
      <TitleModal
        isOpen={isModalOpen}
        title={selectedTitle}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
