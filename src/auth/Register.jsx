/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "@/schema";
import { axiosFormInstance } from "@/utils";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [preview, setPreview] = React.useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const profilePictureFile = watch("profilePicture");

  React.useEffect(() => {
    if (profilePictureFile && profilePictureFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result);
      fileReader.readAsDataURL(profilePictureFile[0]);
    }
  }, [profilePictureFile]);

const onSubmit = async (data) => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); 
  const username = `${data.firstName}.${data.lastName}.${randomSuffix}`.toLowerCase();

  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('username', username);
  formData.append('profilePicture', data.profilePicture[0]); // assuming it's a FileList

  const response = await axiosFormInstance.post('/user/new', formData);
  console.log(response.data);
};




  return (
    <div className="flex w-full h-[100vh] items-center justify-center flex-col">
      <span className="w-25 h-25 flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="w-[60px] h-[60px] rounded-full object-cover" />
        ) : (
          <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor">
              <path d="M50 10C30 10 15 25 15 50C15 75 30 90 50 90H80V70H50C40 70 30 60 30 50C30 40 40 30 50 30H80V10H50Z" />
              <circle cx="65" cy="50" r="7" />
            </g>
          </svg>
        )}
      </span>
      <h1 className="text-[25px] font-bold uppercase mt-2">hey developer!</h1>
      <h1 className="text-[12px] pt-2 uppercase">
        we're glad you're <span>here</span>, please <span>register</span> to <span>get</span> full access!
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex flex-col items-end justify-end gap-4">
        <div className="flex gap-2">
          <div className="border w-[195px] rounded-lg relative">
            <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 bg-background left-[10px]">first name</span>
            <input {...register("firstName")} type="text" className="w-[180px] pl-2 h-12 outline-none bg-transparent" />
            
          </div>
          <div className="border w-[195px] rounded-lg relative">
            <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 bg-background left-[10px]">last name</span>
            <input {...register("lastName")} type="text" className="w-[180px] pl-2 h-12 outline-none bg-transparent" />
            
          </div>
        </div>

        <div className="border w-[400px] rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 bg-background left-[10px]">email address</span>
          <input {...register("email")} type="text" className="w-[398px] pl-2 h-12 outline-none bg-transparent" />

        </div>

        <div className="border w-[400px] rounded-lg relative">
          <span className="absolute font-semibold text-[12px] uppercase top-[-9px] px-1 bg-background left-[10px]">password</span>
          <input {...register("password")} type={showPassword ? "text" : "password"} className="w-[398px] pl-2 h-12 outline-none bg-transparent" />
          <div className="absolute top-3.5 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeClosed /> : <Eye />}
          </div>
        </div>

        <div className="file border-2 w-full h-[100px] border-dashed border-[#ec133f] relative flex items-center justify-center">
          <input {...register("profilePicture")} type="file" className="w-full h-full absolute opacity-0" />
          <span className="z-10">Upload Profile</span>
        </div>

        <p className="uppercase text-sm">already have an account? <span className="cursor-pointer font-semibold" onClick={() => navigate('/')}>login account</span></p>

        <Button type="submit" className="w-full rounded-lg h-12 font-semibold text-lg uppercase">register</Button>

        <p className="uppercase text-[10px] text-center w-full">by creating account you agree to our <span>privacy policy</span></p>
      </form>
    </div>
  );
};

export default Register;
