import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import ItemsIndex from './components/ItemsIndex';
import ItemDetails from './components/ItemDetails';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Stores from './components/Stores';
import Likes from './components/Likes';
import StoreDetails from './components/StoreDetails';
import CreateItem from './components/CreateItem';
import SearchResults from './components/SearchResults';
import ProfileItemTiles from './components/ProfileItemTiles';
import StoreReviews from './components/StoreReviews';
import StoreItemTiles from './components/StoreItemTiles';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className="layout">
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
        path: 'stores',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Stores />
          },
          {
            path: ':storeId',
            element: <StoreDetails />,
            children: [
              {
                path: 'create-item',
                element: <CreateItem />
              },
              {
                path: 'listings',
                element: <StoreItemTiles />
              },
              {
                path: 'reviews',
                element: <StoreReviews />
              }
            ]
          }
        ]
      },
      {
        path: 'profile',
        element:
          <Profile />,
        children: [
          // {
          //   index: true,
          //   element: <ProfileItemTiles />
          // },
          {
            path: 'listings',
            element: <ProfileItemTiles />
          },
          {
            path: 'reviews',
            element: <StoreReviews />
          }
        ]
      },
      {
        path: 'likes',
        element: <Likes />
      },
      {
        path: 'search',
        element: <SearchResults />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
