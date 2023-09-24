import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/user/userSlice';
import SignInForm from '../components/SignInForm/SignInForm';
import { useApi } from '../hooks/useApi';

const SignIn = () => {

  return (
      <SignInForm/>
  );
}


export default SignIn;