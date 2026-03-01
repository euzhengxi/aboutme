import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import portrait from './assets/portrait.jpeg'
import background from './assets/bg2.png'
import './App.css'

function Cover() {
  const [showTerminal, setShowTerminal] = useState(true)
  const [showTypingBubble, setShowTypingBubble] = useState(true)
  const [startTyping, setStartTyping] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()
  const wordList = ['> Hello! Welcome to my personal website', '> Let me pull up my portfolio...']
  var totalCount = 0
  for (let word of wordList) {
    totalCount += word.length
  }

  const sdeDropdown = [{"name": "Fullstack Internship", "width": "80%", "offset": "translateX(12%)","url": "/aboutme/skygauge"}, 
    {"name": "Cloud Internship", "width": "70%", "offset": "translateX(21%)", "url": "/aboutme/amd"}, 
    {"name": "Side Projects", "width": "60%", "offset": "translateX(32%)", "url": "/aboutme/sideprojects"}, 
    ]
  

  // 1. Flashing typing bubble, then start typewriter
  useEffect(() => {
    const hasShown = sessionStorage.getItem('shownAnimation')
    console.log(hasShown)
    if (hasShown != 'true') {
      const bubbleTimeout = setTimeout(() => {
        setShowTypingBubble(false)
        setStartTyping(true)
        sessionStorage.setItem('shownAnimation', 'true');
      }, 2000)
    
      return () => clearTimeout(bubbleTimeout)
    } else {
      setShowTerminal(false);
      setShowContent(true);
      setShowButtons(true);
    }
    
  }, [])

  // 2. Watch charCount — if done, start transitions
  useEffect(() => {
    if (charCount >= totalCount) {
      //fade out terminal
      setTimeout(() => setShowTerminal(false), 1000)
      //fade in content
      setTimeout(() => setShowContent(true), 1000)
      //fade in buttons
      setTimeout(() => setShowButtons(true), 2000)
    }
  }, [charCount])

  return (
    <div style={styles.outerContainer}>
      {/* Terminal Screen */}
      {showTerminal && (
        <div className={`terminal-screen ${charCount >= totalCount ? 'fade-out' : ''}`}>
          {showTypingBubble && <span className="typing-bubble">_</span>}

          {startTyping && (
            <Typewriter
              words={wordList}
              typeSpeed={70}
              deleteSpeed={0}
              delaySpeed={2000}
              loop={1}
              cursor
              cursorStyle="_"
              onType={() => setCharCount(prev => prev + 1)}
            />
          )}
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="fade-in" style={{width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <h1 style={{color:'white'}}>Welcome!</h1>
          <div style={styles.innerContainer}>
            <div style={styles.textSection}>
              <p style={{ width: '475px', fontSize: '1rem', marginBottom: '1rem', color:'white' }}>
                I am Zheng Xi, some of you may know me as Zac. I am a Computer Engineering graduate from the National University of Singapore.
                I am an aspiring machine learning engineer and full-snack developer. 🍨🍦
              </p>
            </div>

            <div style={styles.portraitWrapper}>
              <img src={portrait} alt="Portrait" style={styles.portrait} />
            </div>
          </div>
          
          {showButtons && (
            <div className="fade-in">
              <p style={{marginTop: '3.5rem', fontSize: '1.3rem', fontWeight:'bold', color:'white'}}>What do you wish to find out more about?</p>
              <div style={styles.buttonRow}>
                <button style={styles.button} onClick={()=>navigate('/aboutme/noc')}>My NOC Journey</button>
                <div style={styles.wrapper} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} >
                  <button style={styles.button}> Software Development </button>
                    {open && (
                      <div style={styles.dropdown}>
                        {sdeDropdown.map((element, i) => (
                          <div key={i} style={styles.item}
                            onMouseEnter={e => { 
                              const line = e.currentTarget.querySelector(".underline"); 
                              line.style.width = element["width"]; 
                              line.style.transform = element["offset"];
                            }}

                            onMouseLeave={e => { 
                              const line = e.currentTarget.querySelector(".underline"); 
                              line.style.width = "0%"; }}

                            onClick={() => navigate(element["url"])}>
                            <span style={styles.text}>{element["name"]}</span>
                            <div className="underline" style={styles.underline}></div>
                          </div>
                      ))}
                      </div>
                    )}
                </div>
                <button style={styles.button} onClick={()=>navigate('/aboutme/ML')}>Machine Learning</button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    padding: '0',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden'
  },

  innerContainer: {
    display: 'flex',
    width: '900px',
    height: '300px',
    //border: '1px solid #ddd',
    //boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },

  portraitWrapper: {
    flex: '0 0 325px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },

  portrait: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    border: '5px solid #ccc',
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
  },

  textSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '1rem 3rem',
    textAlign: 'left'
  }, 

  buttonRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    height: 40,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  
  // Optional: hover effect
  buttonHover: {
    backgroundColor: '#45a049'
  },

  dropdown: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  item: {
    padding: "0.75rem 1rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: "white",
    
  },

  underline: {
    bottom: "6px",
    height: "2px",
    width: "0%",
    backgroundColor: "red",
    transition: "width 0.3s ease",
    borderRadius: "2px",
    transform: "translateX(10%)",
  },

}

export default Cover
