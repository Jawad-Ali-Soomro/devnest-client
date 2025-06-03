import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from 'react-router-dom'

const Register = () => {
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
      <h1 className="text-[25px] font-bold uppercase mt-10">hey developer!</h1>
      <h1 className="text-[12px] pt-2 uppercase">
        we're glad you're <span>here</span>, please <span>register</span> to{" "}
        <span>get</span> full access!
      </h1>
      <form
        action=""
        className="mt-20 flex flex-col items-end justify-end gap-4"
      >
        <div className="flex gap-2">
            <div className="border w-[195px] h-13 rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 text-sm bg-background left-[10px]">
            first name
          </span>
          <input
            type="text"
            className="border-none w-[180px] pl-2 h-12 outline-none bg-transparent"
          />
        </div>
        <div className="border w-[195px] h-13 rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 text-sm bg-background left-[10px]">
            last name
          </span>
          <input
            type="text"
            className="border-none w-[180px] pl-2 h-12 outline-none bg-transparent"
          />
        </div>
        </div>
         <div className="border w-[400px] h-13 rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 text-sm bg-background left-[10px]">
            email address
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
        <p className="uppercase text-sm">already have an account <span className="cursor-pointer font-semibold" onClick={() => navigate('/')}>login account?</span></p>
        
        <Button className={"w-[100%] rounded-lg cursor-pointer h-12 font-semibold text-lg uppercase"}>register</Button>
        <p className="uppercase text-[10px] text-center w-[100%]">by creating account you agree to our <span>privacy policy</span></p>
      </form>
    </div>
  );
};

export default Register;
