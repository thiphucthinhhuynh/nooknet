import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import ItemsIndex from './components/ItemsIndex';
import ItemDetails from './components/ItemDetails';
import Sidebar from './components/Sidebar';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}

      <div>
        <Sidebar />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ItemsIndex />
      },
      {
        path: 'items',
        element: <Outlet />,
        children: [
          {
            path: ':itemId',
            element: <ItemDetails />
          }
        ]
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'stores',
        element: <Stores />
      },
      {
        path: 'likes',
        element: <Likes />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
