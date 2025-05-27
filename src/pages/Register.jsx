import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../styles/Register.scss";
import { FaAt, FaRegEnvelopeOpen, FaAngleLeft } from "react-icons/fa6";
import { LuKey } from "react-icons/lu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import {registerSchema} from "../schema";

const Register = () => {
  const [tab, setTab] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const file = data.profilePicture[0];
    console.log("Form submitted:", data);
    console.log("Selected file:", file);
  };

  const goNext = async () => {
    let isValid = false;
    if (tab === 1) {
      isValid = await trigger(["firstName", "lastName", "username"]);
    } else if (tab === 2) {
      isValid = await trigger(["email", "password", "confirmPassword"]);
    }
    if (isValid && tab < 3) {
      setTab(tab + 1);
    }
  };

  const goBack = () => tab > 1 && setTab(tab - 1);

  return (
    <div className="flex main-container">
      {/* <div className="left flex col">
        <img
          src={
            tab === 1
              ? "personal.jpg"
              : tab === 2
              ? "cred.jpg"
              : tab === 3
              ? "upload.jpg"
              : "personal.jpg"
          }
          alt=""
        />
      </div> */}
      <div className="register-container flex col">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="flex col quote">
          <h1>
            Hey <span>Developer</span>!
          </h1>
          <p>
            Please <span>provide</span> us{" "}
            <span>
              {tab === 1
                ? "personal details"
                : tab === 2
                ? "credentials"
                : tab === 3
                ? "profile picture"
                : "skills"}
            </span>{" "}
            of you!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-section">
          {tab === 1 && (
            <div className="tab-container flex col">
              <div className="flex input-wrapper">
                <MdOutlineDriveFileRenameOutline />
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}

              <div className="flex input-wrapper">
                <MdOutlineDriveFileRenameOutline />
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}

              <div className="flex input-wrapper">
                <FaAt />
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                />
              </div>
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}

              <div className="flex btns">
                {tab < 3 && (
                  <button type="button" onClick={goNext}>
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          {tab === 2 && (
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

              <div className="flex input-wrapper">
                <LuKey />
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}

              <div className="flex btns">
                <button
                  type="button"
                  style={{ background: "#333", width: "50px" }}
                  onClick={goBack}
                >
                  <FaAngleLeft />
                </button>
                {tab < 3 && (
                  <button type="button" onClick={goNext}>
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          {tab === 3 && (
            <div className="tab-container flex col">
              <label htmlFor="profilePicture" className="upload-box">
                {watch("profilePicture")?.[0]?.name || "Upload Profile"}
              </label>
              <input
                {...register("profilePicture")}
                type="file"
                id="profilePicture"
                style={{ display: "none" }}
                accept="image/jpeg, image/png"
              />

              {errors.profilePicture && (
                <p className="error">{errors.profilePicture.message}</p>
              )}

              <div className="flex btns">
                <button
                  type="button"
                  style={{ background: "#333", width: "50px" }}
                  onClick={goBack}
                >
                  <FaAngleLeft />
                </button>
                <button type="submit" style={{ width: "400px" }}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="bottom-count flex">
          {[1, 2, 3].map((t) => (
            <div
              key={t}
              className="counter cursor-pointer"
              onClick={() => setTab(t)}
              style={{
                width: tab === t ? "50px" : "20px",
                transition: "width 0.3s ease",
                borderRadius: "10px",
                height: "5px",
                background: tab === t ? "#0154b7" : "rgba(255,255,255,0.1)",
                margin: "0 5px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
