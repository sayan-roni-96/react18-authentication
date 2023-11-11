import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComponentRoute from './ComponentRoute';
import { Route } from 'react-router-dom';

function App() {
  const getLocalstorageData = JSON.parse(localStorage.getItem('userdata'));
  console.log('getLocalstorageData->', getLocalstorageData);
  return (
    <div className="app_login">
      {/* <h1>Welcome to My React App</h1> */}

      <ComponentRoute />
    </div>
  );
}

export default App;
