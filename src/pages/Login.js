import React from 'react';

const Login = () => {
  return (
    <>
      <form action="">
        {/* <!-- Headings for the form --> */}
        <div className="headingsContainer">
          <h3>Sign in</h3>
          <p>Sign in with your username and password</p>
        </div>

        {/* <!-- Main container for all inputs --> */}
        <div className="mainContainer">
          {/* <!-- Username --> */}
          <label htmlFor="username">Your username</label>
          <input type="text" placeholder="Enter Username" name="username" required />

          <br /><br />

          {/* <!-- Password --> */}
          <label htmlFor="pswrd">Your password</label>
          <input type="password" placeholder="Enter Password" name="pswrd" required />

          {/* <!-- sub container for the checkbox and forgot password link --> */}
          <div className="subcontainer">
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>
            <p className="forgotpsd"> <a href="#">Forgot Password?</a></p>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit">Login</button>

          {/* <!-- Sign up link --> */}
          <p className="register">Not a member?  <a href="#">Register here!</a></p>
        </div>
      </form>
    </>
  );
};

export default Login;
