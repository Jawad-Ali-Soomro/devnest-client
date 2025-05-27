import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../styles/Register.scss";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { LuKey } from "react-icons/lu";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "../schema"; // Make sure you define this

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Login submitted:", data);
  };

  return (
    <div className="flex main-container">
      <div className="register-container flex col">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="flex col quote">
          <h1>
            Welcome <span>Back</span>!
          </h1>
          <p>
            Please <span>login</span> with your <span>credentials</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-section">
          <div className="tab-container flex col">
            <div className="flex input-wrapper">
              <FaRegEnvelopeOpen />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}

            <div className="flex input-wrapper">
              <LuKey />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <div className="text flex">
                <a href="/forgot">Forgot Password?</a>
            </div>

            <div className="flex btns">
              <button type="submit" style={{ width: "230px" }}>
                Login
              </button>
            </div>
          </div>
        </form>

        <button className="btn-login" onClick={() => window.location.replace("/register")}>register</button>

        
      </div>
    </div>
  );
};

export default Login;
