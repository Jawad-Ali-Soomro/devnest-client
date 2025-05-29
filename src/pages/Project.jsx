import React from 'react'
import TopBar from '../components/TopBar'
import '../styles/Project.scss'
import { BiPlus } from 'react-icons/bi'
import { API_BASE_URL } from '../constants'
import { BsGithub, BsPencil } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import { RiGithubLine } from 'react-icons/ri'

const Project = () => {
    const userInfo = JSON.parse(window.localStorage.getItem("user"))
    console.log(userInfo)
  return (
    <div>
      <TopBar />
      <div className="main-project flex col">
        <div className="flex" style={{width:'100%', justifyContent: 'end'}}>
              <button>Add Project</button>
              <button className='flex' style={{width:'40px'}}><BiPlus /></button>
        </div>
        <div className="flex container">
            {
                userInfo?.projects && userInfo?.projects?.map((project) =>  {
                    return <div className="project-card flex col">
                       <div className="flex top-project">
                        <img src={`${API_BASE_URL}/${project?.logo}`} alt="" />
                         <div className="flex icon">

                         <BsPencil />
                         </div>
                       </div>
                       <p>{project?.description.substring(0,100)}...</p>
                       <a className='flex' href={project?.repositoryUrl}><RiGithubLine /></a>
                       <div className="flex btns">
                        <button  className='btn'>Skillset</button>
                        <button  className='btn'>contributors</button>
                       </div>
                    </div>
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Project
