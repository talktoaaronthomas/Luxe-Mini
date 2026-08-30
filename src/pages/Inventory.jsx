import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import CarCard from '../components/CarCard'
import { cars } from '../data/cars'

export default function Inventory() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'all'

  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended')

  const filteredCars = useMemo(() => {
    let result = cars

    // 1. Category Filter
    if (activeFilter !== 'all') {
      result = result.filter(car => car.category === activeFilter)
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        car => car.name.toLowerCase().includes(q) || car.variant.toLowerCase().includes(q)
      )
    }

    // 3. Sorting
    result = [...result].sort((a, b) => {
      // Helper to parse price (e.g. "₹6.25L" -> 6.25)
      const parsePrice = (priceStr) => {
        return parseFloat(priceStr.replace(/[^0-9.]/g, ''))
      }

      if (sortBy === 'price-low') return parsePrice(a.price) - parsePrice(b.price)
      if (sortBy === 'price-high') return parsePrice(b.price) - parsePrice(a.price)
      if (sortBy === 'newest') return b.year - a.year
      return 0 // 'recommended' uses default array order
    })

    return result
  }, [activeFilter, searchQuery, sortBy])

  return (
    <main className="inventory-page" style={{ minHeight: '100vh', background: 'var(--white)' }}>
      
      {/* Inventory Header */}
      <section className="inventory-header" style={{ 
        background: 'var(--primary)', 
        color: 'var(--white)', 
        padding: '120px 0 var(--space-2xl)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>Our Inventory</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Browse our complete collection of premium pre-owned vehicles. Use filters to find your perfect match.
          </p>
        </div>
      </section>

      {/* Controls Bar */}
      <section className="inventory-controls" style={{ padding: 'var(--space-xl) 0', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 'var(--space-lg)', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <input 
                type="text" 
                placeholder="Search by make or model..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--gray-200)',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
              <svg 
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--gray-400)' }} 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {/* Category Filters */}
            <div className="filter-bar" style={{ margin: 0 }}>
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

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray-500)', fontWeight: 500 }}>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--gray-200)',
                  outline: 'none',
                  background: 'var(--white)',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Year: Newest First</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          
          <div style={{ marginBottom: 'var(--space-lg)', color: 'var(--gray-500)', fontWeight: 500 }}>
            Showing {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'}
          </div>

          {filteredCars.length > 0 ? (
            <div className="car-grid">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--gray-500)' }}>
              <svg style={{ width: '64px', height: '64px', color: 'var(--gray-300)', margin: '0 auto var(--space-md)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <h3>No cars found</h3>
              <p>Try adjusting your filters or search term to find what you're looking for.</p>
              <button 
                className="btn-secondary" 
                style={{ marginTop: 'var(--space-md)' }}
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              >
                Clear all filters
              </button>
            </div>
          )}
          
        </div>
      </section>

    </main>
  )
}
