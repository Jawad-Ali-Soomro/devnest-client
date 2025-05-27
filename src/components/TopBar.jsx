import React from 'react'
import '../styles/Topbar.scss'
import { RiSearch2Line } from 'react-icons/ri'
import {  IoMdNotificationsOutline } from 'react-icons/io'
import { PiGithubLogo } from 'react-icons/pi'

const TopBar = () => {
  return (
    <div className='top-bar-main flex'>
      <div className="search-bar flex">
        <RiSearch2Line />
        <input type="text" />
      </div>
      <div className="icon flex">
        <IoMdNotificationsOutline />
      </div>
       <div className="icon flex">
        <PiGithubLogo />
      </div>
    </div>
  )
}

export default TopBar
