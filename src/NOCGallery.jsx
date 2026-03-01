import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion} from "framer-motion";

import img1 from './assets/troll.jpeg'
import img2 from './assets/skygaugebbq.jpeg'
import img3 from './assets/bonding.jpeg'
import img4 from './assets/cooperathon.JPG'
import img5 from './assets/nationalDay.JPG'
import img6 from './assets/networking.png'
import img7 from './assets/ethglobal.jpeg'

export default function NOCGallery() {
  const imageList = [
    { src: img1, alt: 'Gallery Image 1' },
    { src: img2, alt: 'Gallery Image 2' },
    { src: img3, alt: 'Gallery Image 3' },
    { src: img4, alt: 'Gallery Image 4' },
    { src: img5, alt: 'Gallery Image 5' },
    { src: img6, alt: 'Gallery Image 6' },
    { src: img7, alt: 'Gallery Image 7' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const intervalRef = useRef(null)
  const navigate = useNavigate()

  // Start or resume auto-cycling
  const startAutoCycle = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imageList.length)
    }, 2000)
  }

  // Pause auto-cycling
  const stopAutoCycle = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  useEffect(() => {
    if (!showModal) {
      startAutoCycle()
    } else {
      stopAutoCycle()
    }

    return () => stopAutoCycle()
  }, [showModal])

  const handleImageClick = () => {
    setShowModal(true)
  }

  const handleModalClick = () => {
    setShowModal(false)
  }

  return (
    <div style={{backgroundColor:'#212124'}}>
      <motion.div 
        style={styles.pageWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div style={{display:'flex', width:'100vw'}}>
          <button style={{width: '6rem', height:'2.4em', marginLeft: '10rem', marginRight:'18.5rem', marginTop: "2rem", color:"white", background:"transparent", border: '1px solid rgba(255,255,255,0.2)'}} onClick={()=>navigate('/aboutme/')}>← Back</button>
          <h1 style={styles.title}>NUS Overseas College</h1>
        </div>
        

        <div style={styles.contentRow}>
          {/* Left Text Section */}
          <div style={styles.leftText}>
            <h2 style={{color:'white'}}>My year abroad in Toronto, Canada</h2>
            <p style={{color:'white', textAlign: 'left'}}>
              I was honored to be selected for the NUS Overseas College program which provided me with the opportunity to spend a year in Toronto.
              During this time, I interned at a local drone startup and actively immersed myself within the local startup scene, frequently attending events
              and conversing with founders whose passion and vision left a lasting impression on me. <br/> <br/> I also deepened my interest in blockchain technologies
              through various events including the ETHGlobal hackathons in Toronto and 
              <a href="https://github.com/dkcodes2/amm-pint" target="_blank" rel="noreferrer" > San Francisco </a> 
              — the latter marking my first hackathon victory. It was an incredibly fulfilling year, one that not only expanded my 
              technical and entrepreneurial horizons but also sparked a long-term aspiration to build a career abroad.
            </p>
          </div>

          {/* Right Image Section */}
          <div style={styles.rightImageBlock}>
            <img
              src={imageList[currentIndex].src}
              alt={imageList[currentIndex].alt}
              style={styles.mainImage}
              onClick={handleImageClick}
            />

            <div style={styles.thumbnailRow}>
              {imageList.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    ...styles.thumbnail,
                    border: idx === currentIndex ? '3px solid #4CAF50' : '2px solid #ccc',
                    transform: idx === currentIndex ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal for enlarged image */}
        {showModal && (
          <div style={styles.modalOverlay} onClick={handleModalClick}>
            <img
              src={imageList[currentIndex].src}
              alt={imageList[currentIndex].alt}
              style={styles.modalImage}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

const styles = {
  pageWrapper: {
    width: '100vw',
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#212124'
  },

  title: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color:'white'
  },

  contentRow: {
    display: 'flex',
    gap: '2rem',
    maxWidth: '1000px',
    alignItems: 'center'
  },

  leftText: {
    flex: 3,
    fontSize: '1rem',
    lineHeight: '1.6rem',
  },

  rightImageBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    marginTop:'1.5rem'
  },

  mainImage: {
    width: '83%',
    height: '250px',
    borderRadius: '10px',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    objectFit: 'cover',
    cursor: 'pointer'
  },

  thumbnailRow: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent:'center'
  },

  thumbnail: {
    width: '7%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },

  modalImage: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    cursor: 'pointer'
  }
}


