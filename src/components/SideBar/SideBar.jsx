import './SideBar.css';
import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import { Context } from '../../Context/Context';

const SideBar = () => {
const [extended,setExtended]= useState(false)
const {onSent,previousPrompt,setRecentPrompt} =useContext(Context)

  return (
    <div className='sidebar '>
        <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div className="new-chat">
                <img src={assets.plus_icon} alt="" />
            {extended?<p>new chat</p>:null}
            </div>
            {extended? <div className="recent">
                <p className="recent-title">Recent</p>
                {previousPrompt.map((item,index)=>{
                    return(
                <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,20)} ...</p>
                </div>
                    )
                })}
                
            </div>:null}
           
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}

export default SideBar