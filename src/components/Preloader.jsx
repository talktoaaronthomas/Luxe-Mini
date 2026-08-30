import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

export default function Preloader() {
  const [stage, setStage] = useState('initial')

  useEffect(() => {
    // 1. Initial wait time to show the centered logo
    const initialWait = setTimeout(() => {
      setStage('animating')
      
      // 2. Wait for the animation to finish, then unmount
      const animationWait = setTimeout(() => {
        setStage('hidden')
      }, 1200) 
      
      return () => clearTimeout(animationWait)
    }, 2500)

    return () => clearTimeout(initialWait)
  }, [])

  if (stage === 'hidden') return null

  return (
    <div className={`preloader-overlay ${stage === 'animating' ? 'fade-out' : ''}`}>
      <div className="preloader-navbar-dummy container">
        <div className={`preloader-logo-target ${stage === 'animating' ? 'show' : ''}`}></div>
      </div>
      
      <div className={`preloader-logo-wrapper ${stage === 'animating' ? 'move-to-header' : ''}`}>
        <img src={logo} alt="Luxe Mini Loading" />
      </div>
    </div>
  )
}
