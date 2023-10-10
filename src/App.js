import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="app_login">
    <h1>Welcome to My React App</h1>
    <body>
    <Login /> {/* Render the Login component here */}
    </body>
  </div>
  );
}

export default App;
