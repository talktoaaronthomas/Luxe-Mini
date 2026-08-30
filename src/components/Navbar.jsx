import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      if (window.lenis) window.lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
    
    return () => {
      document.body.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleAnchorClick = (e, hash) => {
    e.preventDefault()
    closeMenu()
    if (location.pathname !== '/') {
      window.location.href = '/' + hash
      return
    }
    const target = document.querySelector(hash)
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  const isHome = location.pathname === '/'
  const isScrolled = !isHome || scrolled

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Luxe Mini" className="logo-img" />
        </Link>
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>Why Us</a>
          <Link to="/inventory" onClick={closeMenu}>Inventory</Link>
          <a href="#how-it-works" onClick={(e) => handleAnchorClick(e, '#how-it-works')}>How It Works</a>
          <a href="#testimonials" onClick={(e) => handleAnchorClick(e, '#testimonials')}>Reviews</a>
          <a href="#contact" className="navbar-cta mobile-cta" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact Us</a>
        </div>
        
        <div className="navbar-right">
          <a href="#contact" className="navbar-cta desktop-cta" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact Us</a>
          <button
          className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        </div>
      </div>
    </nav>
  )
}
