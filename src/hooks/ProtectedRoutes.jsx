import { API_BASE_URL } from "@/constant";
import { Sidebar } from "@/custom";
import axios from "axios";
import { Layout } from "lucide-react";
import { Camera } from "lucide-react";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const userId = window.localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/user/${userId}`);
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  return  <div className="flex">
      <Sidebar isOpen={isOpen} role={user?.role} />
      <div className="flex flex-col flex-grow p-5">
        <div
          className="w-[40px] cursor-pointer top-10 fixed z-10000"
          onClick={() => setIsOpen(!isOpen)}
          style={{
              transform: isOpen ? 'translateX(80px)' : 'translateX(0)',
              transition: '.3s'
          }}
        >
          <div className="h-[2px] mb-1 bg-black rounded"></div>
          <div className="h-[2px] w-[20px] mb-1 bg-black rounded"></div>
          <div className="h-[2px] bg-black rounded"></div>
        </div>
        <div className="top-bar flex h-25 border bg-white w-[100%] fixed top-0 left-0 z-10 flex justify-center items-center pr-10" style={{
          borderRadius:'0'
        }}>
          <img src='/logo.png' className='h-10' alt="" onClick={() => navigate('/home')} />
          <div className="flex ml-10 p-1 border">
            <img src={`${API_BASE_URL}/uploads/profiles/${user?.avatar}`} className='w-10' alt="" />
            <input type="text" placeholder="What's on your mind!" className='w-[250px] h-10 outline-none ml-2' />
          </div>
          <div className="flex gap-2 ml-2">
            <div className="flex w-12 items-center justify-center h-12 border cursor-pointer bg-[#eee]">
              <Video className='icon' />
            </div>
              <div className="flex w-12 items-center justify-center h-12 border cursor-pointer bg-[#eee]">
              <Camera className='icon' />
            </div>
              <div className="flex w-12 items-center justify-center h-12 border cursor-pointer bg-[#eee]">
              <Layout className='icon' />
            </div>
             <div className="flex w-40 uppercase text-sm font-bold items-center justify-center h-12  cursor-pointer bg-[#111] text-white" onClick={() => navigate('/profile')}>
             update profile
            </div>
          </div>
        </div>
      <div className="mt-15">
        {
          children
        }
      </div>
      </div>
    </div>;
};

export default ProtectedRoute;
