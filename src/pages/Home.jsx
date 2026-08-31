import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import WhySection from '../components/WhySection'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import CarCard from '../components/CarCard'
import { cars } from '../data/cars'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all')

  // Use a subset for featured cars on homepage, filtered by category
  const filteredCars = activeFilter === 'all' 
    ? cars 
    : cars.filter(car => car.category === activeFilter)
  
  const featuredCars = filteredCars.slice(0, 6)
  
  useEffect(() => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.reveal')
    
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }
    
    const revealOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
    
    const observer = new IntersectionObserver(revealCallback, revealOptions)
    revealElements.forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Hero />
      <WhySection />
      
      <section className="inventory-section section-padding" id="inventory">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Cars</h2>
            <p className="section-subtitle">Explore our handpicked collection of pre-owned budget cars, all ready for a test drive.</p>
            <div className="gold-line"></div>
          </div>
          
          <div className="filter-bar">
            {['all', 'hatchback', 'sedan', 'suv'].map(category => (
              <button 
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                style={{ textTransform: 'capitalize' }}
              >
                {category === 'all' ? 'All Cars' : category}
              </button>
            ))}
          </div>

          <div className="car-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/inventory" className="btn-secondary reveal">View All Cars</Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <Contact />
    </main>
  )
}
