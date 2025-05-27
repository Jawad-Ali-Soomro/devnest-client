import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../styles/Register.scss";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { LuKey } from "react-icons/lu";
import { loginSchema } from "../schema"; // Make sure you define this
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
      window.location.reload()
    }
  }, [navigate]);

  const onSubmit = async (data) => {
   try {
     const api = await axios.post(`${API_BASE_URL}/${API_ENDPOINTS.LOGIN}`, data)
     if(api.data.success) {
       localStorage.setItem("token", api.data.token);
       window.location.replace("/dashboard");
     }
   } catch (error) {
    console.log(error)
   }
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
