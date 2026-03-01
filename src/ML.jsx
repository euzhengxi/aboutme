import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom'


import pa25i1 from './assets/mobile.png'
import pa25i2 from './assets/inference.png'
import pa24i1 from './assets/SIM1.png'
import pa24i2 from './assets/SIM2.png'

const projects = [
  {
    id: 1,
    date: "Aug 2025",
    projectLink: 'https://github.com/seandooa/cg4002-capstone-code',
    title: "Hardware Accelerated Machine Learning",
    details: " As our final year capstone project, my team implemented a real-time exercise form evaluator, where users are able to get immediate feedback on their exercise posture. This is achieved via a 2 step evaluation process. Geometric data is first obtained from a pretrained pose estimation model. This data is then transformed before it is relayed to the neural network running on the FPGA. Finally, the results are displayed on mobile app. ",
    implementation: "A PyTorch model is first trained on geometric features engineered according to background research on correct exercise posture. A C++ implementation of the neural network is then created with the help of the C++ HLS library. Subsequently, a .xmodel file that enables the neural network to run on the FPGA is obtained by running the necessary RTL simulations and converting the C++ model. This .xmodel file is then incorporated into a custom block design (similar to a schematic), which is loaded onto the FPGA during runtime to conduct inference",
    optimisations:["Inline functions and pragmas (such as pipelining) are adopted, which significantly accelerated the inference speed (~0.3ms per inference) at the expense of higher resource consumption."], 
    wild: [],
    images:[pa25i1]
  },

  {
    id: 2,
    date: "July 2025",
    projectLink: '',
    title: "Reinforcement Learning using Human Feedback undergraduate Research",
    details: "This is a undergraduate research on Reinforcement Learning using Human Feedback (RLHF). Current RLHF literature focuses mainly on ratings and preferences, which may not be readily available. Natural language responses are in abundance but they tend to be noisy. To circumvent this issue, I propose complementing the reward function with the agent's understanding of the environment. Unlike usual model based approaches that creates a reward function, this model aims to capture the context of the task and dynamics of the environment and represents this in the latent space. These latent vectors are treated as proxies for logic, which are trained using the JEPA architecture.",
    implementation: "Human feedback is simulated using cached LLM responses. The dynamics of the environment is captured using a custom feature extractor and the model is trained using the PPO algorithm using TorchRL in the Minigrid environment. Unfortunately, the results of the research is unable to prove my hypothesis.",
    optimisations:["Multithreaded environmental rollout", "Entropy driven exploration", "Experience replay", , "Reward shaping in sparse reward environment"], 
    wild: [],
    images:[]
  },

  {
    id: 3,
    date: "June 2025",
    projectLink: 'https://github.com/euzhengxi/deep-learning/tree/main/CV',
    title: "Small dataset classification neural network",
    details: "I wanted to build a simple CNN neural network that can classify rock types as collecting rock samples is one of my hobbies (😂). Unlike most Computer Vision tasks, there is a lack of quality rock sample images online, which inadvertently created an interesting constraint.",
    implementation: " The initial setup comprise a custom CNN setup that relies on CELoss. Subsequently, a more targetted approach is adopted, including more aggressive image augmentations and smooth labelling. Even with these modifications, I could not improve the performance beyond ~55%. This motivated me to explore other architectures including transformers. In this process, I realised that certain rock types embody 'global' characteristics that evade typical shallow CNNs. Leveraging on transfer learning and further complementing it with ensemble inference, I managed to improve the performance of the model to ~80%.",
    optimisations:['Hardware acceleration using MPS (Metal Performance Shaders)', 'Parallel data processing and loading, including MacOS architecture specific tweaks. Unfortunately, memory pinning could not be achieved on MacOS.', 'PyTorch autograd optimisations - determining when it is necessary to track gradients to reduce overhead'], 
    wild: ['Reducing MSE between samples, which I later realised is a unrefined form of reducing KL divergence', 'Starting with sum of errors across the batch to reduce biase as a whole before refining it with average error across the batch to reduce variance'],
    images:[]
  },
  {
    id: 4,
    date: "Aug 2024",
    projectLink: '',
    title: "Time series forecasting for motor fault prediction",
    details: "This is part of the simulation development project during my most recent internship - develop a time series forecasting model predicts normal motor behaviour given its history and targets. Abnormal drone behaviour can be detected by doing a comparsion between the output of this model and the actual flight data. ",
    implementation: "It is built using Pytorch and uses the LSTM architecture. Passing the targets through the LSTM did not make sense in the context of the task as it had no temporal dependencies. Hence it is fed directly into the Linear layer, forming a partial skip connection which facilitated the gradient flow. Final performance of the model is ~87.5% on average.",
    optimisations:['Support for concurrent training and inference pipelines',  'Hardware acceleration using CUDA streams as there is only 1 GPU core, which reduces computation time by ~20%'],
    wild: [],
    images:[pa24i1, pa24i2]
  },
];

export default function ML() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleScroll = (e) => {
    if (isAnimating || showIntro) return;

    setIsAnimating(true);
    setShowContent(false);

    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else if (e.deltaY < 0) {
      setCurrentIndex((prev) => prev > 0 ? prev - 1: projects.length - 1);
    } 
    
    console.log(currentIndex)
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false, once:true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [isAnimating, showIntro]);

  return (
    <div style={styles.container}>
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            style={styles.intro}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 style={styles.title}>Modelling Human Intelligence</h1>
            <p style={styles.subtitle}>1 neuron at a time — ok, maybe thousands</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Title */}
      {!showIntro && (
        <motion.div
          style={styles.header}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <button style={{width: '6rem', height:'3em', marginLeft:'10rem', marginRight:'19rem', color:"white", background:"transparent", border: '1px solid rgba(255,255,255,0.2)'}} onClick={()=>navigate('/aboutme/')}>← Back</button>
          <h1>On Machine Learning</h1>
        </motion.div>
      )}

      {/* Project Section */}
      <AnimatePresence mode="wait">
        {!showIntro && (
          <motion.div
            key={currentIndex}
            style={styles.projectSection}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.7 }}
            onAnimationComplete={() => setShowContent(true)}
          >
            {showContent && (
              <motion.div
                style={styles.projectRow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onAnimationComplete={() => {setIsAnimating(false)}}
              >
                <div style={styles.left}>{projects[currentIndex].date}</div>

                <div style={styles.timeline}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: currentIndex == 0 ?  '' : '1px solid #ccc', position: "absolute", top: "-6%", transform: "translateY(-50%)"}}></div>
                  <div style={styles.line}></div>
                  <div style={styles.circle}></div>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: currentIndex < projects.length - 1 ?  '1px solid #ccc' : 0, position: "absolute", top: "106%", transform: "translateY(-50%)"}}></div>
                  
                </div>

                {/*details of project*/}
                <div style={styles.right}>
                  <div style={{display:'flex', flexDirection:"row", alignItems:"center"}}>
                    <p style={{marginRight: "0.5rem"}}>{projects[currentIndex].title}</p>
                    <a href={projects[currentIndex].projectLink} target="_blank" rel="noreferrer" > (Link)</a> 
                  </div>
                  

                  <div style={{display:'flex'}}>
                    <p style={{fontSize:'0.9rem', fontWeight:'bold', marginRight:'0.5rem'}}>Details:</p>
                    <p style={{fontSize:'0.9rem'}}>{projects[currentIndex].details}</p>
                  </div>

                  <div style={{display:'flex'}}>
                    <p style={{fontSize:'0.9rem', fontWeight:'bold', marginRight:'0.5rem'}}>Implementation:</p>
                    <p style={{fontSize:'0.9rem'}}>{projects[currentIndex].implementation}</p>
                  </div>

                  {projects[currentIndex].wild.length != 0 && <div style={{display:'flex'}}>
                    <p style={{fontSize:'0.9rem', fontWeight:'bold', marginRight:'0.5rem', width: '15%'}}>Wild ideas:</p>
                    <div>{projects[currentIndex].wild.map(
                      (text, index) => 
                        (<div key={index} style={{display:'flex', marginBottom:'-1.5rem'}}>
                          <p style={{fontSize:'0.9rem', marginRight:'0.3rem'}}>{index + 1}. </p>
                          <p key={index} style={{fontSize:'0.9rem'}}>{text}</p>
                        </div>))}
                    </div>
                  </div>}

                  {projects[currentIndex].optimisations.length != 0 && <div style={{display:'flex', marginTop:'1.0rem'}}>
                    <p style={{fontSize:'0.9rem', fontWeight:'bold', marginRight:'0.5rem'}}>Optimisations:</p>
                    <div>{projects[currentIndex].optimisations.map(
                      (text, index) => 
                        (<div key={index} style={{display:'flex', marginBottom:'-1.5rem'}}>
                          <p style={{fontSize:'0.9rem', marginRight:'0.3rem'}}>{index + 1}. </p>
                          <p key={index} style={{fontSize:'0.9rem'}}>{text}</p>
                        </div>))}
                    </div>
                  </div>}

                  <div style={{display:'flex', marginTop:'1.5rem', width:'100%', justifyContent:'center'}}>
                    {projects[currentIndex].images.map(
                      (image, index) => (
                          <img key={index} src={image} style={{width: '30%', borderRadius: '6px', marginRight: '2rem'}} />
                    ))}
                  </div>
                </div>
                
                {<div style={{
                      ...styles.arrowContainer,
                      color: currentIndex !== projects.length - 1 ? "white" : "transparent"
                    }}>
                    <svg
                      style={styles.arrow}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      fill="currentColor"
                    >
                      <path d="M12 16.5l-6-6 1.41-1.41L12 13.67l4.59-4.58L18 10.5z" />
                    </svg>
                  </div>}
              </motion.div>
            )}
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    fontFamily: "monospace",
  },
  intro: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#000",
    zIndex: 20,
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.2rem",
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    marginTop: "2rem",
    marginBottom:'-1rem',
    zIndex: 5,
    position: "relative",
    display:'flex',
    alignItems:'center'
  },
  projectSection: {
    width: "100vw",
    marginLeft: '6rem'
  },
  projectRow: {
    display: "flex",
    alignItems: "center",
    gap: "4rem",
    fontSize: "1.2rem",
    padding: "1rem",
    maxWidth: "80%",
  },
  left: {
    height: "100%",
    textAlign: "right",
    fontWeight: "bold",
    justifyContent: "center",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  line: {
    height: "150px",
    width: "2px",
    backgroundColor: "#fff",
  },
  circle: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  right: {
    textAlign: "left",
    width:'100%',
  },
  arrowContainer: {
    width: "1%",
    marginTop: "5rem",
  },
  arrow: {
    animation: "bob 1.2s infinite",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}`, styleSheet.cssRules.length);

