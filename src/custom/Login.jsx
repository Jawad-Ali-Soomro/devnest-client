import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginYupSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(loginYupSchema)
  });
  const submitForm = async () => {
    console.log(errors);
  }
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <img src="/logo.png" alt="" className="w-[200px]" />
      <form onSubmit={handleSubmit(submitForm)} className="flex gap-2 mt-10 items-center justify-center flex-col max-w-[350px]">
        <h1 className="uppercase text-[25px] font-bold">welcome back!</h1>
        <p className="uppercase text-[12px] text-center">
          We <span className="text-[#ec133e] font-bold">hope</span> you are
          doing well please{" "}
          <span className="text-[#ec133e] font-bold">login</span> to continue
        </p>
        <div className="flex flex-col w-[350px] gap-1 mt-10">
            <Label className={'uppercase'}>
                Email Address
            </Label>
            <Input {...register("email")}>
            </Input>
        </div>
         <div className="flex flex-col w-[350px] gap-1 mt-2">
            <Label className={'uppercase'}>
                password
            </Label>
            <Input {...register("password")}>
            </Input>
        </div>
        <Button type="submit" className={'w-[100%] mt-2 bg-[#ec133e]/80 text-white hover:bg-[#ec133e]/90'}>
            LOGIN
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
