import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './styles/App.css';
import { Container } from '@mui/material';
import RoomPage from './pages/RoomPage';
import SignInPage from './pages/SignInPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginUser } from './redux/user/userSlice';
import CreateRoomPage from './pages/CreateRoomPage';
import { ToastContainer } from 'react-toastify';
import JoinRoomPage from './pages/JoinRoomPage';
import theme from './styles/theme';
import { SearchTitlePage } from './pages/SearchTitlePage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container maxWidth="lg">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/room/:id" element={<RoomPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/create-room" element={<CreateRoomPage />} />
            <Route path="/join-room/:roomId" element={<JoinRoomPage />} />
            <Route path="/title-search" element={<SearchTitlePage />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
