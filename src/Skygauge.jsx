import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

import skygauge from './assets/skygauge.png'
import p1i1 from './assets/DI.png'
import p1i2 from './assets/DIv1.png'
import p1i3 from './assets/DIv2.png'
import p1i4 from './assets/DIbackend.png'
import p2i1 from './assets/BMS1.png'
import p2i2 from './assets/BMS2.png'
import p2i3 from './assets/BMS3.png'
import p3i1 from './assets/SIM1.png'
import p3i2 from './assets/SIM2.png'
import './Skygauge.css'

export default function Skygauge() {

  const contentList = [
    {
      videoURL: 'https://drive.google.com/file/d/1kJlzuY6rwpp89HWgYagoRnm1zZeZMpH4/preview',
      thumbnails: [p1i1, p1i2, p1i3, p1i4],
      description: ['1. Migrating drone interface from x86 to arm64 architecture', 'This is a fullstack development task, where I redesigned the UIUX and implemented both the frontend and backend. The thumbnails on the right showcases the initial interface as well as the subsequent iterations. Implementing the new drone interface turned out more tedious than expected because of 2 main reasons - difference in architcture (x86 vs ARM64) as well as complex state management (dictated by UX and business logic). Backend development was more straightforward although it required additional knowledge on networking (such as TCP/IP, ports and checksums). Frontend was implemented in Qt while the backend was managed by CPP. Overall, its a pretty fulfilling project']
    },
    {
      videoURL: 'https://drive.google.com/file/d/1VClHqXolPo8xGZbRwCJbJ7L6etQJcKqC/preview',
      thumbnails: [p2i1, p2i2, p2i3,],
      description: ['2. Data Analytics for Battery Management System', 'This purpose of this project is to develop a simple battery management system to indicate remaining flight time. The first step involves determining the right variables to use, be it through theoretical or statistical methods. Subsequently, an algorithm has to be developed. Not only does the algorithm need to work within the constraints imposed by the hardware, there were also other restrictions put in place to ensure the critical functionalities of the drone. Lastly, mediating measures were also necessary due to the noisy environment. The algorithm evolved from a simple polynomial regression model to more complex forms that relied on the kalman filter.']
    },
    {
      videoURL: 'https://drive.google.com/file/d/1sMwb66lqKfr--te4F2wqSwpkqlKlhAjT/preview',
      thumbnails: [p3i1, p3i2],
      description: ['3. Simulation Environment Development', 'This is the most interesting project I have ever done. The goal of this task is to create a virtual test environment for newly written code. This project is split into multiple phases. The first phase requires creating a virtual replica of the drone in the NVIDIA ISAAC simulation environment (which relies on the USD framework developed by PIXAR) and defining the necessary physical laws. The second phase focuses on the creation of a time series forecasting model that aims to model drone behaviour given its history and targets. More details on the machine learning model, including the optimisations, can be found in my tab on ML projects.']
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalImage, setModalImage] = useState(null)
  const navigate = useNavigate()

  const nextContent = () => {
    setCurrentIndex((prev) => (prev + 1) % contentList.length)
  }

  const prevContent = () => {
    setCurrentIndex((prev) => (prev - 1 + contentList.length) % contentList.length)
  }

  const openModal = (imgSrc) => {
    setModalImage(imgSrc)
  }

  const closeModal = () => {
    setModalImage(null)
  }

  const { videoURL, thumbnails, description } = contentList[currentIndex]

  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', backgroundColor:"#212124"}}>
      <motion.div className="carousel-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div style={{width:'100vw', display:'flex', alignItems:'center'}}>
          <button style={{width: '6rem', height:'2.4em', marginLeft:'6.5rem', marginRight:'19rem', color:"white", background:"transparent", border: '1px solid rgba(255,255,255,0.2)'}} onClick={()=>navigate('/aboutme/')}>← Back</button>
          <h1 className="carousel-title" >My projects at Skygauge Robotics</h1>
        </div>
        
        
        <p style={{fontWeight:'bold', marginBottom:'1.5rem', color: "white"}}>{description[0]}</p>

        <div className="carousel-frame">
          {/* Left Arrow */}
          <button style={{marginRight:'2rem'}} onClick={prevContent}>←</button>

          {/* Main Video */}
          <iframe
            className="main-video"
            src={videoURL}
            title="Project Video"
            allowFullScreen
          />

          {/* Thumbnails */}
          <div className="thumbnails">
            {thumbnails.map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                alt={`Thumbnail ${idx}`}
                className="thumbnail"
                onClick={() => openModal(thumb)}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button style={{marginLeft:'2rem'}} onClick={nextContent}>→</button>
        </div>

        {/* Text Rows */}
        <div className="text-rows">
          <p style={{textAlign:'left', color: "white"}}>{description[1]}</p>
        </div>

        {/* Modal Image Viewer */}
        {modalImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <img src={modalImage} alt="Full view" className="modal-image" />
          </div>
        )}
      </motion.div>
    </div>
  )
}
