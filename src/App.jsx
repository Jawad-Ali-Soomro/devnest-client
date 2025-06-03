import { Settings } from "lucide-react";
import React, { useEffect } from "react";
import { ThemeSettings } from "./Providers";
import { Login, Register } from "./Auth";
import { Routes, Route, useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const App = () => {
  const [openSettings, setOpenSettings] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.3);
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const commonRoutes = [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> }
  ];

  return (
    <div onClick={() => setOpenSettings(false)} className="w-full min-h-screen">
      <div className="fixed bottom-[20px] right-[20px]">
        <div
          className="w-[50px] h-[50px] border flex items-center justify-center rounded-full dark:hover:bg-[#222] hover:bg-[#eee] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpenSettings(!openSettings);
          }}
        >
          <Settings />
        </div>
      </div>
      <Routes>
        {commonRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Routes>
      <ThemeSettings
        isOpen={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      />
    </div>
  );
};

export default App;
