import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import TasksPage from './pages/tasksPage/TaskList';
import PersonalPage from './pages/personalPage/PersonalPage';
import AuthPage from './pages/authPage/AuthPage';
import { autoriseUserData } from './store/redusers/asyncUserReducer';
import { UserFormState } from './models/models';
import { AuthContext } from './context/context';

function App() {
  const [auth, setAuth] = useState<boolean | string | null>(!!JSON.parse(localStorage.getItem('auth') || "false"));
  const state = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  let _storageDataUser = localStorage.getItem('user');

  if (_storageDataUser && state.name === null && state.userId === null) {
    let _data: UserFormState = JSON.parse(_storageDataUser);
    dispatch(autoriseUserData({
      name: _data?.name,
      password: _data?.password
    }));
  }

  const routerAuth = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "/",
          element: <TasksPage />,
        },
        {
          path: "/personal",
          element: <PersonalPage />,
        },
      ],
    },
    {
      path: '/*',
      element: <Navigate to={`/`} />
    },
  ]);
  const router = createBrowserRouter([
    {
      path: "/registration",
      element: <AuthPage />,
    },
    {
      path: "/autorise",
      element: <AuthPage />,
    },
    {
      path: '/:type/*',
      element: <Navigate to={`/registration`} />
    },
    {
      path: '/',
      element: <Navigate to={`/registration`} />
    },
  ]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      <RouterProvider router={auth ? routerAuth : router} />
    </AuthContext.Provider>
  )
};

export default App;