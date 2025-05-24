import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { registerSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {useNavigate} from 'react-router-dom'

const RegisterForm = () => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const avatarFile = watch("avatar");
  const navigate = useNavigate()

  React.useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [avatarFile]);

const submitForm = async (data) => {
  try {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);

    const res = await axiosInstance.post("/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Account created successfully!");
    console.log("Registration successful:", res.data);
    window.localStorage.setItem("userId", res.data.userId)
    navigate("/home")
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.message || "Registration failed";
    toast.error(message);
  }
};


  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <img src="/logo.png" alt="" className="w-[200px]" />
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex gap-2 mt-10 items-center justify-center flex-col max-w-[350px] w-full"
      >
        <h1 className="uppercase text-[25px] font-bold text-black">
          Hello there!
        </h1>
        <p className="uppercase text-[12px] text-center text-black">
          Good to <span className="text-[#ec133e] font-bold">see</span> you are
          here please{" "}
          <span className="text-[#ec133e] font-bold">register</span> to
          continue
        </p>

 {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full mt-10 border"
            />
          )}
        {/* Username */}
        <div className={`flex flex-col w-full gap-1 ${preview ? "mt-2": "mt-10"}`}>
          <Label className="uppercase text-black">username</Label>
          <Input {...register("username")} />
          {errors?.username && (
            <p className="uppercase text-[#ec133e] mt-1 text-[12px] font-bold">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col w-full gap-1 mt-2">
          <Label className="uppercase text-black">Email Address</Label>
          <Input {...register("email")} />
          {errors?.email && (
            <p className="uppercase text-[#ec133e] mt-1 text-[12px] font-bold">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col w-full gap-1 mt-2">
          <Label className="uppercase text-black">password</Label>
          <Input type="password" {...register("password")} />
          {errors?.password && (
            <p className="uppercase text-[#ec133e] mt-1 text-[12px] font-bold">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col w-full gap-1 mt-2">
          <div className="relative flex items-center justify-center w-full h-[120px] border-2 border-dashed border-[#ec133e]/50 rounded-xl cursor-pointer transition-all">
            <input
              type="file"
              accept="image/*"
              {...register("avatar")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-sm text-black uppercase z-10">
              {preview ? "Change Image" : "Upload Image"}
            </p>
          </div>
         
          {errors?.avatar && (
            <p className="uppercase text-[#ec133e] mt-1 text-[12px] font-bold">
              {errors.avatar.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4 uppercase bg-[#ec133e]/80 text-white hover:bg-[#ec133e]/90"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
