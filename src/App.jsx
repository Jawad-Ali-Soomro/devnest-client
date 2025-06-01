import { Settings } from "lucide-react";
import React from "react";
import { ThemeSettings } from "./Providers";
import { Login } from "./Auth";
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [openSettings, setOpenSettings] = React.useState(false);
  const commonRoutes = [
    {
      path: '/',
      element: <Login />
    }
  ]
  return (
    <div onClick={() => setOpenSettings(false)} className="w-full min-h-screen">
      <div className="fixed bottom-[20px] right-[20px]">
        <div className="w-[50px] h-[50px] border flex items-center justify-center rounded-full dark:hover:bg-[#222] hover:bg-[#eee] cursor-pointer"
        onClick={(e) => {e.stopPropagation(); setOpenSettings(!openSettings)}}>
          <Settings />
        </div>
      </div>
      <Routes>
    {
        commonRoutes.map((route, idx) => {
          return <Route path={route.path} element={route.element} key={idx} />
        })
      }
      </Routes>
      <ThemeSettings
        isOpen={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      />
    </div>
  );
};

export default App;
