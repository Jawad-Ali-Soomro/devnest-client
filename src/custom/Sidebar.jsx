import { API_BASE_URL } from "@/constant";
import { useFetchUser } from "@/hooks/FetchUser";
import { LayoutDashboard } from "lucide-react";
import { LogOut } from "lucide-react";
import {
  Users,
  Settings,
  Home,
  FileText,
  Briefcase,
  CheckSquare,
  Code,
  Bell,
  Folder,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, role }) => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const { user } = useFetchUser();
  const navigate = useNavigate()

  const navs = {
    admin: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/home" },
      { name: "Manage Users", icon: Users, path: "/admin/users" },
      { name: "Manage Posts", icon: FileText, path: "/admin/posts" },
      { name: "Manage Companies", icon: Briefcase, path: "/admin/companies" },
      { name: "Manage Tasks", icon: CheckSquare, path: "/admin/tasks" },
      {
        name: "Manage Code Snippets",
        icon: Code,
        path: "/admin/code-snippets",
      },
      {
        name: "Manage Notifications",
        icon: Bell,
        path: "/admin/notifications",
      },
      { name: "Manage Projects", icon: Folder, path: "/admin/projects" },
      { name: "Settings", icon: Settings, path: "/admin/settings" },
    ],
    user: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/home" },
      { name: "My Posts", icon: FileText, path: "/user/posts" },
      { name: "My Tasks", icon: CheckSquare, path: "/user/tasks" },
      { name: "My Code Snippets", icon: Code, path: "/user/code-snippets" },
      { name: "Notifications", icon: Bell, path: "/user/notifications" },
      { name: "My Projects", icon: Folder, path: "/user/projects" },
    ],
  };

  return (
    <div
      className="fixed w-[80px] top-0 left-0 h-full bg-[#0e0e23] text-white pt-5 flex z-1000000"
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        borderRadius: 0,
      }}
    >
      <nav className="flex flex-col gap-1 w-full items-center ">
        {(navs[role] || []).map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          const isHovered = hovered === name;
          const iconColor = isActive
            ? "#eb133c"
            : isHovered
            ? "#eb133c"
            : "white";
          const iconScale = isActive ? 1.2 : 1;

          return (
            <Link
              key={name}
              to={path}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center justify-center gap-3 text-lg font-semibold w-[60px] h-[60px] rounded-md
                ${isActive ? "bg-[white]" : ""}
                hover:text-red-600 hover:bg-[white]`}
              style={{ color: isActive ? "#eb133c" : "inherit" }}
            >
              <Icon
                size={20}
                color={iconColor}
                className="icon"
                style={{
                  transform: `scale(${iconScale})`,
                  transition: "transform 0.2s ease, color 0.2s ease",
                }}
              />
            </Link>
          );
        })}
      </nav>
      <div className="fixed bottom-5 w-[100%] flex flex-col justify-center items-center gap-2 ">
        <div className="flex w-[60px] h-[60px] items-center border border-gray-600 justify-center rounded-xl overflow-hidden p-2 hover:bg-gray-800 hover:border-none  cursor-pointer" onClick={() => navigate('/profile')}>
          <img
            src={`${API_BASE_URL}/uploads/profiles/${user?.avatar}`}
            className="rounded-xl"
            alt=""
          />
        </div>
        <div
          className="flex cursor-pointer w-[60px] h-[60px] bg-[#eb133c] items-center justify-center rounded-xl"
          onClick={() => {
            window.localStorage.clear();
            window.location.reload();
          }}
        >
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
