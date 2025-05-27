import { Route, Routes } from "react-router-dom";
import {CustomCursor} from "./components";
import { Register, Login } from "./pages";

const App = () => {
  const commonRoutes  = [
    {
      path: '/register',
      element:<Register />
    },
     {
      path: '/',
      element:<Login />
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
