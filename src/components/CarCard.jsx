import { Link } from 'react-router-dom'

export default function CarCard({ car, revealClass = '' }) {
  return (
    <div className={`car-card ${revealClass}`} data-category={car.category}>
      <div className="car-card-image" style={!car.image ? { background: car.placeholderColor } : undefined}>
        {car.image ? (
          <img src={car.image} alt={car.name} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#041E41" strokeWidth="1.5" opacity="0.4"><rect x="1" y="6" width="22" height="12" rx="3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M5 6l2-3h10l2 3"/></svg>
            <span style={{ fontSize: '0.75rem', color: '#041E41', opacity: 0.5, fontWeight: 500 }}>{car.name}</span>
          </div>
        )}
        <span className="car-badge">{car.badge}</span>
      </div>
      <div className="car-card-body">
        <h3>{car.name}</h3>
        <p className="car-variant">{car.variant}</p>
        <div className="car-meta">
          <div className="car-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {car.year}
          </div>
          <div className="car-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
            {car.km}
          </div>
          <div className="car-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>
            {car.owner}
          </div>
        </div>
        <div className="car-card-footer">
          <div className="car-price">{car.price} <small>onwards</small></div>
          <Link to={`/car/${car.id}`} className="btn-view">View Details</Link>
        </div>
      </div>
    </div>
  )
}
