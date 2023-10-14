import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import an SVG eye icon (you can use any SVG icon you prefer)
//import EyeIcon from './eye-icon.svg';

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  //const [icon, setIcon] = useState(eyeOff);
  //const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible(!isPasswordVisible);
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('api=>', `${process.env.REACT_APP_USER_ONLINE_API}/api/users`);

    let hasError = false;
    if (userName == '' || userName.trim() == '') {
      toast.error('Please fill in the username field.');
      hasError = true;
    } else if (email.trim() === '') {
      toast.error('Please fill in the email field.');
      hasError = true;
    } else if (!isEmailValid(email)) {
      toast.error('Please enter a valid email address.');
      hasError = true;
    } else if (!isPasswordValid(password)) {
      toast.error(
        'Please enter a valid password with at least 6 characters, one uppercase letter, one lowercase letter, one special character, and one digit.'
      );
      hasError = true;
    }

    if (!hasError) {
      const formFieldData = {
        username: email,
        email: email,
        password: password,
      };

      const userData = {
        user: formFieldData,
      };

      axios
        .post(`${process.env.REACT_APP_USER_ONLINE_API}/api/users`, userData)
        .then((resp) => {
          console.log('resp =>', resp);
          if (resp.status === 201) {
            console.log('User added successfully.');

            localStorage.setItem('userdata', JSON.stringify(resp.data));
            setEmail('');
            setPassword('');
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error('save_error =>', err);
        });
    }
  };
  //   const handleToggle = () => {
  //    if (type==='password'){
  //       setIcon(eye);
  //       setType('text')
  //    } else {
  //       setIcon(eyeOff)
  //       setType('password')
  //    }
  // }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="headingsContainer">
          <h3>Sign in</h3>
          <p>Sign in with your username and password</p>
        </div>
        <div className="mainContainer">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="pswrd">Your password</label>
          <div className="password-input-container">
            <input
              type={isPasswordVisible ? 'text' : 'password'} // Toggle input type based on visibility
              placeholder="Enter Password"
              name="pswrd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="flex justify-around items-center"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            >
              {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
            {/* Add the SVG eye icon here */}
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
          <p className="register">
            Not a member? <Link href="#">Register here!</Link>
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Login;
