import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="flex w-[100%] h-[100vh] flex items-center justify-center flex-col">
      <span className="w-25 h-25 flex items-center justify-center">
        <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            <path d="M50 10C30 10 15 25 15 50C15 75 30 90 50 90H80V70H50C40 70 30 60 30 50C30 40 40 30 50 30H80V10H50Z" />
            <circle cx="65" cy="50" r="7" />
          </g>
        </svg>
      </span>
      <h1 className="text-[25px] font-bold uppercase mt-10">Welcome Back!</h1>
      <h1 className="text-[12px] pt-2 uppercase">
        we hope you're <span>doing</span> well, <span>login</span> to{" "}
        <span>access</span> account!
      </h1>
      <form
        action=""
        className="mt-20 flex flex-col items-end justify-end gap-4"
      >
        <div className="border w-[400px] h-13 rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 text-sm bg-background left-[10px]">
            Email Address
          </span>
          <input
            type="text"
            className="border-none w-[398px] pl-2 h-12 outline-none bg-transparent"
          />
        </div>
        <div className="border w-[400px] h-13 rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 text-sm bg-background left-[10px]">
            Password
          </span>
          <input
            type="text"
            className="border-none w-[398px] pl-2 h-12 outline-none bg-transparent"
          />
        </div>
        <span className="uppercase text-sm cursor-pointer font-semibold">Forgot Password?</span>
        <Button className={"w-[100%] rounded-lg cursor-pointer h-12 font-semibold text-lg"}>LOGIN</Button>
        <p className="uppercase text-sm">Don't have an account <span className="cursor-pointer font-semibold" onClick={() => navigate('/register')}>Create account?</span></p>
      </form>
    </div>
  );
};

export default Login;
