import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const getLocalstorageData = JSON.parse(localStorage.getItem('userdata'));
  console.log('getLocalstorageData->', getLocalstorageData);
  return (
    <div className="app_login">
      <h1>Welcome to My React App</h1>
      <body>
        {/* {getLocalstorageData.email === 'utest@yahoo.com' &&
        getLocalstorageData.status === 'active' ? (
          <Dashboard />
        ) : (
          <Login />
        )} */}
        <Login />
        {/* Render the Login component here */}
      </body>
    </div>
  );
}

export default App;
