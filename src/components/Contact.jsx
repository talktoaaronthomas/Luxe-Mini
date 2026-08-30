import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { cars } from '../data/cars'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const location = useLocation()
  
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const carId = params.get('carId')
    const action = params.get('action')

    if (action === 'test_drive' && carId) {
      const car = cars.find(c => c.id === parseInt(carId))
      if (car) {
        setInterest('test_drive')
        setMessage(`I would like to request a test drive for the ${car.name} (${car.variant}).`)
      }
    }

    if (location.hash === '#contact') {
      const el = document.getElementById('contact')
      if (el) {
        setTimeout(() => {
          const navHeight = document.getElementById('navbar')?.offsetHeight || 0
          const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - navHeight
          window.scrollTo({ top: targetPosition, behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location.search, location.hash])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setInterest('')
      setMessage('')
      e.target.reset()
      
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    }, 1500)
  }

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Visit Our Showroom</h2>
            <p className="section-subtitle">Experience the Luxe Mini difference in person. Our experts are ready to help you find your perfect car.</p>
            <div className="gold-line" style={{ margin: 'var(--space-lg) 0' }}></div>
            
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="contact-item-text">
                  <h4>Location</h4>
                  <p>Luxe Mini Showroom, NH Bypass,<br />Edappally, Kochi, Kerala 682024</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div className="contact-item-text">
                  <h4>Call Us</h4>
                  <p>+91 98765 43210<br />+91 98765 43211</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="contact-item-text">
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 9:30 AM - 7:00 PM<br />Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <h3>Request a Call Back</h3>
            <p>Leave your details and our team will get back to you shortly.</p>
            
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="Enter your name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" required placeholder="Enter your phone" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" />
                </div>
                <div className="form-group">
                  <label>Interested In</label>
                  <select required value={interest} onChange={(e) => setInterest(e.target.value)}>
                    <option value="" disabled>Select an option</option>
                    <option value="test_drive">Request Test Drive</option>
                    <option value="buy">Buying a Car</option>
                    <option value="sell">Selling a Car</option>
                    <option value="finance">Financing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea rows="3" placeholder="How can we help you?" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn-primary ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`}
                style={{width: '100%', justifyContent: 'center'}}
                disabled={status !== 'idle'}
              >
                {status === 'idle' && 'Submit Request'}
                {status === 'loading' && 'Sending...'}
                {status === 'success' && 'Request Sent Successfully!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
