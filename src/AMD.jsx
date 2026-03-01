import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion} from "framer-motion";

const K8S = [
  {title: '1. Setting up', description: 'The first step of this task involves verifying whatever has been tested so far (as I inherited the project from the previous intern) and familiarising myself with the workflow. For errors that surface frequently, frameworks (such as a checklist) or workarounds (like prepulling images due to TLS errors) have to be devised. For consistent performance issues, a deepdive into plausible causes is necessary. For example, frequency disconnection while using Minikube is later found to be caused by a configuration error. '},
  {title: '2. Containerising PGSQL', description: 'The next step involves setting up a PGSQL server (the last component yet to be added to the cluster) within a containerised environment and evaluating the performance of existing database migration measures. Setting up the database involves not only pulling and running the image. Configuration changes for persistent storage and coherent logs as well as performance optimisations are also required. For database migration methods, multi job parallelization methods were explored.'},
  {title: '3. Testing other container runtimes', description: 'After ensuring cluster deployments can be carried out successfully using different distributions, optimisations can now be performed. In addition, trials can also be conducted using different container runtimes. Firstly, a functional understanding of containers and the difference between container runtime and container engines is necessary. Subsequently, implementations that are not compatible with the project task (which requires the software to be open sourced and supports multinode) have to be omitted. Eventually, docker engine, containerd and CRI-O were tested with CRI-O having the best performance.'},
  {title: '4. Optimising cluster deployment', description: 'Performance tuning was attempted to improve the deployment of clusters. Firstly, the default kernel profile is changed to a throughput-performance profile, which reduced deployment time by ~30%. Subsequently, attempts were made to change individual parameters, which did not result in observable improvements.'},
]

const KVM = [
  {title: 'Operating System', description: 'After the hypervisor has been installed, different operating systems (used across the department), along with the applications (refer to the kubernetes project for more details), were tested on the new hypervisor. Its performance is then benchmarked against existing measures.'},
  {title: 'Hypervisor', description: 'Once a stable connection is estabished to the management portal of the new servers, preparations for the installation of the hypervisor have to be made. This includes creation of logical drives, setting up of Network File Storage (NFS). Unfortunately, the KVM software was no longer maintained, which resulted in additional issues such as software version incompatibility.'}, 
  {title: 'Hardware', description: 'The first step of this project involves settling the necessary administrative matters such as allocating ports, DNS addresses, network position switches as well as installing the physical servers. Subsequently, connection to the new servers have to be tested via both physical wires as well as the network'},
]

export default function AMD() {
  const [selectedTab, setSelectedTab] = useState("k8s");
  const [currentIndexK8S, setCurrentIndexK8S] = useState(null);
  const [currentIndexKVM, setCurrentIndexKVM] = useState(null);
  const navigate = useNavigate()
  const project = selectedTab == "k8s" ? K8S : KVM;

  return (
    <div style={{backgroundColor:'#212124'}}>
      <motion.div 
        style={styles.pageWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div style={{display:'flex', width:'100vw', marginTop:'5rem', alignItems:'center',}}>
          <button style={{width: '6rem', height:'2.4em', marginLeft: '10rem', marginRight:'10rem', color:"white", background:"transparent", border: '1px solid rgba(255,255,255,0.2)'}} onClick={()=>navigate('/aboutme/')}> ← Back</button>
          <h1 style={styles.title}>My cloud infrastructure internship at AMD</h1>
        </div>

        {/*tabs*/}
        <div style={{display:'flex', marginTop:'1.5rem', gap:'6rem'}}>
          <div
            onClick={() => setSelectedTab("k8s")}
            style={styles.tab(selectedTab === "k8s")}
          >
            Kubernetes POC
          </div>
          <div
            onClick={() => setSelectedTab("kvm")}
            style={styles.tab(selectedTab === "kvm")}
          >
            Kernel-based Virtual Machine (KVM) POC
          </div>
        </div>

        <div>
          {selectedTab == 'k8s' ? 
          //k8s tab
          <div style={{display:'flex', width:'100%', marginTop:'2rem', justifyContent:'center'}}>
          {/* cluster rack illustration */}
            <svg viewBox="0 0 200 200" style={{ width: "150px", height: "150px", marginTop:'2rem' }}>
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#7c0a0a" />
                  <stop offset="1" stopColor="#222" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="180" height="180" rx="10" fill="url(#g1)" />
              <g fill="#fff" opacity="0.85">
              {project.map((layer, index) => (
                <rect key={index} x="24" y={30 + index * 28}  width="152" height="18" rx="2" fill="#fff" opacity="0.85"
                  style={styles.selectableRect(currentIndexK8S === index)}
                  onClick={() => {setCurrentIndexK8S(index); console.log(currentIndexK8S)}}
                />
              ))}
              </g>
            </svg>
            
            <div style={{marginLeft: '5rem', width:'50%'}}>
              { currentIndexK8S == null ? 
                <p style={styles.placeholderText}>
                  Select a layer on the server rack to see more details.
                </p>
              : <div>
                  <h1 style={{fontSize:'2rem', color:'white'}}>{project[currentIndexK8S].title}</h1>
                  <p style={{color:'white'}}>{project[currentIndexK8S].description}</p>
                </div>
              }
            </div>
            
          </div>  
          
          
          //KVM tab
          : <div style={{display:'flex', width:'100%', marginTop:'2rem', justifyContent:'center'}}>
              {/* virtualisation stack illustration */}
              <svg viewBox="0 0 180 220" style={{width: 200, height: 220, cursor: "pointer", }} role="list">
                <defs>
                  <linearGradient id="kvmGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#7c0a0a" />
                    <stop offset="1" stopColor="#222" />
                  </linearGradient>
                  <linearGradient id="kvmHighlight" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#4caf50" />
                    <stop offset="1" stopColor="#357a38" />
                  </linearGradient>
                </defs>
                <g fill="#fff" opacity="0.85">
                {project.map((layer, index) => {
                  const isSelected = currentIndexKVM === index;
                  return (
                    <g
                    key={index}
                    onClick={() => setCurrentIndexKVM(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <motion.rect
                      x="0"
                      y={30 + index * 45}
                      width="150"
                      height="35"
                      rx="8"
                      fill={isSelected ? "url(#kvmHighlight)" : "url(#kvmGradient)"}
                      stroke={isSelected ? "#80e27e" : "none"}
                      strokeWidth={isSelected ? 2 : 0}
                      initial={false}
                      animate={{
                        opacity: isSelected ? 1 : 0.85,
                        scale: isSelected ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <text
                      x="75" 
                      y={32 + index * 46 + 30 / 2} 
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="white"
                      fontSize="1rem"
                      style={{ pointerEvents: "none" }} // so clicks go to rect
                    >
                      {layer.title}
                    </text>
                  </g>)
                })}
                </g>
              </svg>
              
              <div style={{marginLeft: '3rem', width:'50%'}}>
                { currentIndexKVM == null ? 
                  <p style={styles.placeholderText}>
                    Select a layer on the virtualisation stack to see more details.
                  </p>
                : <div style={{width:''}}>
                    <h1 style={{fontSize:'2rem', color:'white'}}>{project[currentIndexKVM].title}</h1>
                    <p style={{color:'white'}}>{project[currentIndexKVM].description}</p>
                  </div>
                }
              </div>
              
            </div> }
        </div>
        
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
    backgroundColor: "#212124",
  },

  title: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color:'white'
  },

  tab: (selected) => ({
    paddingBottom: "8px",
    cursor: "pointer",
    fontWeight: selected ? "700" : "500",
    color: selected ? "white" : "#aaa",
    borderBottom: selected ? "3px solid yellow" : "3px solid transparent",
    userSelect: "none",
    fontSize: "18px",
    transition: "color 0.3s ease, border-bottom 0.3s ease",
  }),
  
  selectableRect: (isSelected) => ({
    fill: isSelected ? "#4caf50" : "#fff",
    opacity: isSelected ? 1 : 0.85,
    stroke: isSelected ? "#80e27e" : "none",
    strokeWidth: 2,
    transition: "all 0.3s ease",
    cursor: "pointer",
  }),

  placeholderText: {
    opacity: 0.6,
    textAlign: "center",
    marginTop: "80px",
    color:"white",
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    cursor: 'pointer'
  },
}

