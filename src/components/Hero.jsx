import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.jpg'

export default function Hero() {
  const handleScroll = (e, hash) => {
    e.preventDefault()
    const target = document.querySelector(hash)
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Luxe Mini Showroom" loading="eager" />
      </div>
      <div className="container hero-content">
        <div className="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          <span>A Division of Luxe Moto</span>
        </div>
        <h1>Pre-Owned<br /><span className="highlight">Budget Cars.</span></h1>
        <p>Discover handpicked, thoroughly inspected used cars at unbeatable prices. Your trusted partner for quality pre-owned vehicles in Kochi, Kerala.</p>
        <div className="hero-buttons">
          <Link to="/inventory" className="btn-primary">
            Browse Cars
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="#contact" className="btn-secondary" onClick={(e) => handleScroll(e, '#contact')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Book a Test Drive
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="arrow"></div>
      </div>
    </section>
  )
}
