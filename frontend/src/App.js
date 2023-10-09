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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/me', {}, {
            headers: {
              'x-auth-token': token,
            },
          });
          const user = response.data;
          dispatch(loginUser({user, token}));
        } catch (error) {
          console.error(error);
        }
      }
    };
    autoLogin();
  }, [dispatch]);


  return (
    <ThemeProvider theme={darkTheme}>
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
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
