import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import architecture from './assets/architecture.png'

export default function SideProjects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomImage, setZoomImage] = useState(null);
    const navigate = useNavigate();

    const projects = [
        {
            title: 'LLM Content Generator',
            desc: 'Coming soon!',
            route: "https://github.com/euzhengxi/LLM_Content_Generation",
            tech: ['RAG', 'LangChain', 'VectorDB'],
            longDesc: 'This is an ongoing project that explores the use of LLM in content generation, assisted by RAG and LangChain.',
            image: ""
        },
        {
            title: 'Payment API',
            desc: 'Production ready backend API system',
            route: "https://github.com/euzhengxi/payment_api",
            tech: ['Python', 'RESTful API', 'Multithreading', 'Event driven architecture', 'Micro-services', 'failsafe'],
            longDesc:'This is a simplified payment api modeled after modern payment systems (like Stripe). Users can create accounts and initiate payments using a client interface. In the event transaction issues arise, the automatic reattempt mechanism helps to ensure that one time issues are dealt with effectively. As each component is implemented as a micro service, monitoring and maintenance are greatly simplified. The adoption of event driven architecture (for side effects like notifications) further improves the overall efficiency of the system. As this is a project designed to mimic real world systems, additional details like scalability and failsafe mechanisms were also considered and implemented in project.',
            image: architecture,
        },
        
    ];

    return (
        <div style={styles.page}>

        {/* Header */}
        <div style={styles.header}>
            <button style={styles.backBtn} onClick={() => navigate('/aboutme')}>
            ← Back
            </button>
            <h1 style={styles.title}>Side Projects</h1>
        </div>

        {/* Main Layout */}
        <div style={styles.layout}>

            {/* Left Column - Project List */}
            <div style={styles.list}>
            {projects.map((p, i) => (
                <motion.div
                key={i}
                style={{
                    ...styles.card,
                    ...(i === activeIndex ? styles.activeCard : {})
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveIndex(i)}
                >
                <div style={styles.accentBar} />
                <h3 style={styles.cardTitle}>{p.title}</h3>
                <p style={styles.cardDesc}>{p.desc}</p>
                </motion.div>
            ))}
            </div>

            {/* Right Column - Details Panel */}
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={styles.detailPanel}
                >
                <h2 style={styles.detailTitle}>
                    {projects[activeIndex].title}
                </h2>

                {/* View Project Link */}
                
                <a href={projects[activeIndex].route} target="_blank" rel="noreferrer" style={styles.viewLink}>View Project → </a> 

                {/* Tech Stack */}
                <div style={styles.techRow}>
                    {projects[activeIndex].tech.map((t, i) => (
                    <span key={i} style={styles.techTag}>{t}</span>
                    ))}
                </div>

                {/* Description */}
                <p style={styles.detailDesc}>
                    {projects[activeIndex].longDesc}
                </p>

                {/* Image Preview */}
                <div style={{ display: 'flex', justifyContent:"center"}}>
                    {projects[activeIndex].image.length != 0 && <motion.img
                    src={projects[activeIndex].image}
                    alt="project"
                    style={styles.previewImage}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setZoomImage(projects[activeIndex].image)}
                />}</div>
                
                </motion.div>


                {zoomImage && (
                    <motion.div
                        style={styles.zoomOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setZoomImage(null)}
                    >
                        <motion.img
                        src={zoomImage}
                        style={styles.zoomImage}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                        />
                    </motion.div>
                    )}
        </div>
        </div>
    );
    }

    const styles = {
    page: {
        height: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at top, #0f172a, #020617)',
        padding: '2.5rem 4rem',
        color: 'white',
        boxSizing: 'border-box',
        overflow: 'hidden'
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '2rem'
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

    title: {
        textAlign: 'center',
        fontSize: '2.6rem',
        letterSpacing: '0.08em'
    },

    layout: {
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '3rem',
        height: 'calc(100% - 6rem)'
    },

    /* LEFT COLUMN */
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.3rem'
    },

    card: {
        position: 'relative',
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '1.2rem 1.2rem 1.2rem 2.2rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
    },

    activeCard: {
        border: '1px solid rgba(56,189,248,0.5)',
        background: 'rgba(56,189,248,0.06)',
        boxShadow: '0 0 25px rgba(56,189,248,0.25)'
    },

    accentBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '3px',
        background: 'linear-gradient(180deg, #38bdf8, #6366f1)'
    },

    cardTitle: {
        fontSize: '1rem',
        marginBottom: '0.3rem',
        fontWeight: 600
    },

    cardDesc: {
        fontSize: '0.78rem',
        opacity: 0.75,
        lineHeight: 1.4
    },

    /* RIGHT PANEL */
    detailPanel: {
        height: "75%",
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '22px',
        padding: '2.2rem',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        display: 'flex',
        flexDirection: 'column'
    },

    detailTitle: {
        fontSize: '1.9rem',
        marginBottom: '1.2rem',
        letterSpacing: '0.04em', 
        marginTop: '0'
    },

    detailDesc: {
        fontSize: '0.95rem',
        lineHeight: 1.7,
        opacity: 0.85,
        marginTop: '1rem'
    },

    techRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem'
    },

    techTag: {
        fontSize: '0.7rem',
        padding: '0.35rem 0.75rem',
        borderRadius: '999px',
        background: 'rgba(56,189,248,0.08)',
        border: '1px solid rgba(56,189,248,0.25)',
        color: '#7dd3fc',
        letterSpacing: '0.05em'
    },
    viewLink: {
        marginBottom: '1rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#38bdf8',
        cursor: 'pointer',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        width: 'fit-content'
      },
      
      previewImage: {
        width: '25%',
        height: '130px',
        objectFit: 'cover',
        borderRadius: '14px',
        cursor: 'zoom-in',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      },
      
      zoomOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'zoom-out'
      },
      
      zoomImage: {
        maxWidth: '90vw',
        maxHeight: '90vh',
        borderRadius: '18px',
        boxShadow: '0 0 80px rgba(0,0,0,0.8)'
      }
};