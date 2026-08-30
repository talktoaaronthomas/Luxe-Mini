const testimonials = [
  {
    id: 1,
    text: "Bought a Hyundai Creta from Luxe Mini and the experience was top-notch. The car was in pristine condition, exactly as described. The financing was smooth and I drove home the same day. Highly recommended!",
    author: 'Arun Nair',
    detail: 'Purchased Hyundai Creta · Kochi',
  },
  {
    id: 2,
    text: "As a first-time car buyer, I was nervous. But the team at Luxe Mini guided me through every step. The Swift I purchased runs like brand new. Great transparency in pricing and documentation. Thank you!",
    author: 'Priya Menon',
    detail: 'Purchased Maruti Swift · Ernakulam',
  },
  {
    id: 3,
    text: "I compared prices across 5 dealerships in Kochi. Luxe Mini offered the best deal on the Honda City — and the warranty they provide gave me peace of mind. The showroom experience feels premium, not your typical used car lot!",
    author: 'Rahul Thomas',
    detail: 'Purchased Honda City · Thrissur',
  },
  {
    id: 4,
    text: "Exchanged my old car and upgraded to a Kia Seltos through Luxe Mini. They offered the best exchange value and the entire process took just 2 days. Being a Luxe Moto brand, you know you're in safe hands.",
    author: 'Deepa Krishnan',
    detail: 'Purchased Kia Seltos · Kochi',
  },
]

function StarIcons() {
  return (
    <div className="testimonial-stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials-section section-padding" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Don't just take our word for it — hear from our happy customers across Kochi.</p>
          <div className="gold-line"></div>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial-track">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <StarIcons />
                <blockquote>{t.text}</blockquote>
                <div className="testimonial-author">
                  <strong>{t.author}</strong>
                  <span>{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
