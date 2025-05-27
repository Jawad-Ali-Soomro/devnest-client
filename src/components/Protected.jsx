import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import "../styles/Layout.scss";
import { GrHomeRounded } from "react-icons/gr";
import { IoBriefcaseOutline } from "react-icons/io5";
import {
  GoFileCode,
  GoOrganization,
  GoSidebarCollapse,
  GoSidebarExpand,
} from "react-icons/go";
import { SlFeed } from "react-icons/sl";
import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { API_BASE_URL } from "../constants";
import { IoIosLogOut } from "react-icons/io";
import { getUser } from "../hooks";
import { HiOutlineLogout } from "react-icons/hi";

const roleBasedLinks = {
  user: [
    { path: "/dashboard", icon: <GrHomeRounded className="cursor-pointer" /> },
    {
      path: "/projects",
      icon: <IoBriefcaseOutline className="cursor-pointer" />,
    },
    { path: "/tasks", icon: <BsListTask className="cursor-pointer" /> },
    { path: "/code", icon: <GoFileCode className="cursor-pointer" /> },
    {
      path: "/organizations",
      icon: <GoOrganization className="cursor-pointer" />,
    },
    { path: "/feed", icon: <SlFeed className="cursor-pointer" /> },
  ],
  admin: [
    { path: "/dashboard", icon: <GrHomeRounded className="cursor-pointer" /> },
    {
      path: "/manage/organizations",
      icon: <GoOrganization className="cursor-pointer" />,
    },
    { path: "/manage/feed", icon: <SlFeed className="cursor-pointer" /> },
    {
      path: "/manage/settings",
      icon: <FiSettings className="cursor-pointer" />,
    },
  ],
};

const Protected = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUserInfo(JSON.parse(localUser));
    } else {
      getUser()
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          setUserInfo(user);
        })
        .catch(() => {
          window.localStorage.clear();
          window.location.href = "/";
        });
    }
  }, []);

  const role = userInfo?.role || "user";

  if (!userInfo) return null;

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <div
        className="sidebar"
        style={{
          transform: showSidebar ? "translateX(0)" : "translateX(-100px)",
        }}
      >
       
        <div className="flex col" style={{ marginTop: "50px", gap: "10px" }}>
          {roleBasedLinks[role].map((link, index) => (
            <a
              key={index}
              href={link.path}
              className="sidebar-link flex cursor-pointer"
              onClick={() => setShowSidebar(false)}
              style={{
                background:
                  window.location.pathname === link.path ? "#0154b7" : "",
                color: window.location.pathname === link.path ? "white" : "",
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="bottom">
          <img src={`${API_BASE_URL}/${userInfo?.profilePicture}`} alt="" />
          <div
            className="icon flex"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <HiOutlineLogout />
          </div>
        </div>
      </div>
      <div
        className="bars flex col"
        style={{ left: "35px" }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? (
          <GoSidebarCollapse size={30} className="cursor-pointer" />
        ) : (
          <GoSidebarExpand size={30} className="cursor-pointer" />
        )}
      </div>
      <div
        style={{
          width: showSidebar ? "calc(100% - 120px)" : "calc(100% - 30px)",
          paddingLeft: "20px",
          transition: ".4s",
          marginTop: showSidebar ? "0" : "70px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Protected;
