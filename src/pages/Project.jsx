import React from "react";
import TopBar from "../components/TopBar";
import "../styles/Project.scss";
import { BiPlus } from "react-icons/bi";
import { API_BASE_URL } from "../constants";
import { BsPencil } from "react-icons/bs";
import { RiGithubLine } from "react-icons/ri";
import { getUser } from "../hooks/user";
import { useEffect } from "react";
import { useState } from "react";

const Project = () => {
  const userInfo = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
    getUser().then((res) => {
      console.log(res);
    });
  }, []);
  const [addProject, setAddProject] = useState(false);
  const [imagePreview, setPreview] = useState()
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    console.log(previewURL);
  }
};

  return (
    <div>
      <TopBar />
      <div className="main-project flex col">
        <div
          className="flex sticky"
          style={{ width: "100%", justifyContent: "end" }}
          onClick={() => setAddProject(true)}
        >
          <button className="btn-top">Add Project</button>
          <button className="flex btn-top" style={{ width: "50px" }}>
            <BiPlus />
          </button>
        </div>
        <div className="flex container">
          {userInfo?.projects &&
            userInfo?.projects?.map((project) => {
              return (
                <div className="project-card flex col">
                  <div className="flex top-project">
                    <img src={`${API_BASE_URL}/${project?.logo}`} alt="" />
                    <div className="flex icon">
                      <BsPencil />
                    </div>
                  </div>
                  <p>{project?.description.substring(0, 100)}...</p>
                  <a className="flex" href={project?.repositoryUrl}>
                    <RiGithubLine />
                  </a>
                  <div className="flex btns" style={{ gap: "10px" }}>
                    <button className="btn">Skillset</button>
                    <button className="btn">contributors</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {addProject && (
        <div
          className="add-popup flex"
          onClick={() => setAddProject(false)}
        >
          <div className="container flex col" onClick={(e) => e.stopPropagation()}>
            <div className="upload flex">
            {
              imagePreview  && 
                <img src={imagePreview} alt="" />
            }
              <p>Logo</p>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
