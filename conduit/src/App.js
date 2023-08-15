import { createContext, useState } from 'react';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const UserContext = createContext();
const router = createBrowserRouter([
  {path:"/register",
  element:<Register/>
  },
  {path:"/login",
  element:<Login/>
  },
])

function App() {
  const [user,setUser] =useState({});

  return (
    <UserContext.Provider value={{user,setUser}}>
    <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;

