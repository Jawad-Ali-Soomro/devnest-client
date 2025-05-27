import { Route, Routes } from "react-router-dom";
import {CustomCursor, Protected} from "./components";
import { Register, Login, Dashboard } from "./pages";

const App = () => {
  const commonRoutes  = [
    {
      path: '/register',
      element:<Register />
    },
     {
      path: '/',
      element:<Login />
    },
      {
      path: '/dashboard',
      element:<Protected>
        <Dashboard />
      </Protected>
    }
  ]
  return (
    <>
      <CustomCursor />
      <Routes>
        {
          commonRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))
        }
      </Routes>
    </>
  );
};
export default App;
