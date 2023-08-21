import { createContext, useState } from 'react';
import './App.css';
import Register from './component/Register';
import LoginPage from './component/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './component/Home/HomePage';
import Editor from './component/Editor';
import ArticleDetail from './component/ArticleDetail';
import Profile from './component/Profile';
import Setting from './component/Settings';
import EditArticle from './component/EditArticle';
import Page404 from './component/404Page/404Page';
import YourFeed from './component/Home/YourFeed';

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
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/editor",
    element: <Editor/>
  },
  {
    path:"/article/:slug",
    element: <ArticleDetail/>
  }, 
  {
    path:"/setting",
    element: <Setting/>
  },
  {
    path:"/yourFeed",
    element: <YourFeed/>
  },
  {
    path: "/edit/:slug",
    element: <EditArticle/>
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