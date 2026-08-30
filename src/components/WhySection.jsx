export default function WhySection() {
  return (
    <section className="why-section section-padding" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Luxe Mini?</h2>
          <p className="section-subtitle">We bring the Luxe Moto standard of excellence to the pre-owned car market — quality you can trust, prices you'll love.</p>
          <div className="gold-line"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <h3>Certified Quality</h3>
            <p>Every vehicle undergoes a rigorous 150-point inspection by our expert technicians before hitting the showroom floor.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <h3>Best Prices in Kochi</h3>
            <p>Transparent pricing with no hidden charges. We guarantee the best market value for every car in our inventory.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            </div>
            <h3>Easy Financing</h3>
            <p>Hassle-free loan approval with our banking partners. Low interest rates and flexible EMI options to fit your budget.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Trusted Brand</h3>
            <p>Backed by Luxe Moto's legacy of trust. Every purchase comes with warranty coverage and complete documentation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
