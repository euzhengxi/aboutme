import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cover from './Cover.jsx'
import NOCGallery from './NOCGallery.jsx'
import Skygauge from './Skygauge.jsx'
import AMD from './AMD.jsx'
import SideProjects from './SideProjects.jsx'
import ML from './ML.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/aboutme/" element={<Cover/>} />
        <Route path="/aboutme/noc" element={<NOCGallery/>} />
        <Route path="/aboutme/amd" element={<AMD/>} />
        <Route path="/aboutme/skygauge" element={<Skygauge/>} />
        <Route path="/aboutme/sideprojects" element={<SideProjects/>} />
        <Route path="/aboutme/ml" element={<ML/>} />
      </Routes>
    </Router>
    
  )
}



export default App
