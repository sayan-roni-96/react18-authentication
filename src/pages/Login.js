import React, { useState } from 'react';
import {Icon} from 'react-icons-kit';
// import {eyeOff} from 'react-icons-kit/feather/eyeOff';
// import {eye} from 'react-icons-kit/feather/eye'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css';

// Import an SVG eye icon (you can use any SVG icon you prefer)
//import EyeIcon from './eye-icon.svg';

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  //const [icon, setIcon] = useState(eyeOff);
  //const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible(!isPasswordVisible);
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
   let hasError = false;

    if (email.trim() === '') {
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
    } else if (!isChecked) {
      toast.error('Please check the checkbox.');
      hasError = true;
    }

    if (!hasError) {
      const newData = {
        email: email,
        password: password,
        status: isChecked ? 'active' : 'inactive',
      };
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/users`, newData)
        .then((resp) => {
          console.log('resp =>', resp);
          if (resp.status === 201) {
            console.log('User added successfully.');
            localStorage.setItem("userdata",JSON.stringify(resp.data))
            setEmail('');
            setPassword('');
            setIsChecked(false);

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
  const getLocalstorageData = JSON.parse(localStorage.getItem("userdata"))
console.log("getLocalstorageData->",getLocalstorageData);
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="headingsContainer">
          <h3>Sign in</h3>
          <p>Sign in with your username and password</p>
        </div>
        <div className="mainContainer">
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
          <label htmlFor="pswrd">Your password</label>
          <div className="password-input-container">
            <input
              type="password" // Toggle input type based on visibility
              placeholder="Enter Password"
              name="pswrd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              {/* <span class="flex justify-around items-center" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
              </span> */}
              {/* Add the SVG eye icon here */}
             {/* <img src={EyeIcon} alt="Toggle Password Visibility" /> */}
            
          </div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              name="remember"
            />
            {isChecked ? 'Active' : 'Inactive'}
          </label>
          <div className="subcontainer">
            <p className="forgotpsd"><a href="#">Forgot Password?</a></p>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
          <p className="register">Not a member? <a href="#">Register here!</a></p>
        </div>
      </form>
       <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Login;
