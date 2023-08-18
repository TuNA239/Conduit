import { createContext, useState } from 'react';
import './App.css';
import Register from './component/Register';
import LoginPage from './component/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './component/Home/HomePage';

export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <HomePage />
  },
]);

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;