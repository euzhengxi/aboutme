import { Component } from 'react'
import maintenanceImage from './assets/maintenance.png'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: true }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <img src={maintenanceImage} style={{ maxWidth: '150px'}}/>
          <h1>Webpage under maintenance</h1>
          <p>Revamping my portfolio page. Pls check out my linkedin instead!
          </p>
          <a
            href="https://www.linkedin.com/in/euzhengxi/"
            target="_blank"
            rel="noreferrer"
            >
            https://www.linkedin.com/in/euzhengxi/
            </a>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
