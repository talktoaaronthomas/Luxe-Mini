import { useParams, Link } from 'react-router-dom'
import { cars } from '../data/cars'

export default function VehicleDetail() {
  const { id } = useParams()
  const car = cars.find(c => c.id === parseInt(id))

  if (!car) {
    return (
      <div className="section-padding" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Vehicle Not Found</h2>
        <p style={{ color: 'var(--gray-500)', margin: 'var(--space-md) 0' }}>The car you're looking for doesn't exist or has been sold.</p>
        <Link to="/inventory" className="btn-primary">Back to Inventory</Link>
      </div>
    )
  }

  // Generic features to display
  const features = [
    'Air Conditioning', 'Power Steering', 'Anti Lock Braking System',
    'Power Windows Front', 'Wheel Covers', 'Passenger Airbag',
    'Automatic Climate Control', 'Fog Lights - Front'
  ]

  return (
    <main className="vehicle-detail-page" style={{ paddingTop: '80px', background: 'var(--gray-50)' }}>
      
      {/* Breadcrumbs */}
      <div className="container" style={{ padding: 'var(--space-lg) var(--space-xl)' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', display: 'flex', gap: '8px' }}>
          <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link>
          <span>/</span>
          <Link to="/inventory" style={{ color: 'var(--primary)' }}>Inventory</Link>
          <span>/</span>
          <span style={{ color: 'var(--gray-800)' }}>{car.name}</span>
        </div>
      </div>

      <section className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <div className="detail-grid">
          
          {/* Left Column: Media & Details */}
          <div className="detail-media">
            <div className="detail-image-wrapper" style={{ 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-md)',
              background: car.image ? 'transparent' : car.placeholderColor,
              aspectRatio: '16/10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-2xl)'
            }}>
              {car.image ? (
                <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0D3526" strokeWidth="1.5" opacity="0.4" style={{ margin: '0 auto 12px' }}><rect x="1" y="6" width="22" height="12" rx="3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M5 6l2-3h10l2 3"/></svg>
                  <span style={{ fontSize: '1rem', color: '#0D3526', opacity: 0.5, fontWeight: 500 }}>No Image Available</span>
                </div>
              )}
            </div>

            <div className="detail-features" style={{ background: 'var(--white)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: 'var(--space-xl)', fontSize: '1.5rem' }}>Key Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                {features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Info & CTA */}
          <div className="detail-sidebar">
            <div style={{ background: 'var(--white)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-sm)' }}>
                <span className="car-badge" style={{ position: 'static' }}>{car.badge}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{car.category}</span>
              </div>
              
              <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xs)', lineHeight: 1.1 }}>{car.name}</h1>
              <p style={{ color: 'var(--gray-500)', fontSize: '1.1rem', marginBottom: 'var(--space-xl)' }}>{car.variant}</p>
              
              <div style={{ padding: 'var(--space-lg) 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)', marginBottom: 'var(--space-xl)' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '4px' }}>Asking Price</div>
                <div style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                  {car.price}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginTop: '4px' }}>*Excluding RTO & Insurance</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                <div className="spec-item">
                  <div className="spec-label">Registration Year</div>
                  <div className="spec-value">{car.year}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Kilometers Driven</div>
                  <div className="spec-value">{car.km}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Ownership</div>
                  <div className="spec-value">{car.owner}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Fuel Type</div>
                  <div className="spec-value">{car.fuel}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Transmission</div>
                  <div className="spec-value">{car.transmission}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <Link to={`/?action=test_drive&carId=${car.id}#contact`} className="btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: '1.1rem', padding: '16px' }}>Request Test Drive</Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ justifyContent: 'center', width: '100%', fontSize: '1.1rem', padding: '16px', background: '#25D366', color: '#fff', borderColor: '#25D366' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
