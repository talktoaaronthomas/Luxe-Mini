import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
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
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Luxe Mini" className="footer-logo-img" />
            </Link>
            <p>A proud division of Luxe Moto — bringing premium quality pre-owned cars to Kochi at the most affordable prices. Drive luxury, pay less.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/luxemoto.in/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/luxemoto.in/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCG2c97djf6d2yq8ONRlYXGQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/inventory">Inventory</Link></li>
              <li><a href="#about" onClick={(e) => handleScroll(e, '#about')}>Why Choose Us</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleScroll(e, '#how-it-works')}>How It Works</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul style={{ lineHeight: '1.6' }}>
              <li>NH Bypass, Edappally<br />Kochi, Kerala 682024</li>
              <li style={{ marginTop: '12px' }}>+91 98765 43210</li>
              <li>+91 98765 43211</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/inventory?category=hatchback">Hatchback Cars</Link></li>
              <li><Link to="/inventory?category=sedan">Sedan Cars</Link></li>
              <li><Link to="/inventory?category=suv">SUV Cars</Link></li>
              <li><Link to="/inventory">All Cars</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Luxe Mini. A division of <a href="#">Luxe Moto</a>. All rights reserved.</p>
          <p>Designed for premium quality and affordability.</p>
        </div>
      </div>
    </footer>
  )
}
