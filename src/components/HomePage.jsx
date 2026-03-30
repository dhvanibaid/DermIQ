const topCards = [
  { label: 'Ingredients Indexed', value: '500+' },
  { label: 'Safe Recommendations', value: '98%' },
  { label: 'Average Cost Saved', value: '₹200' },
  { label: 'Brands Tracked', value: '50+' },
]

const featureCards = [
  {
    number: '01',
    title: 'Build Your Skin Profile',
    text: 'Enter your age, skin type, concerns, sensitivity, and budget in a short form.',
  },
  {
    number: '02',
    title: 'Get Ingredient Guidance',
    text: 'See what ingredients are likely to work for your skin and what to avoid.',
  },
  {
    number: '03',
    title: 'Read the Dashboard',
    text: 'Understand harshness level, best routine flow, alternatives, and value picks.',
  },
  {
    number: '04',
    title: 'Use Smarter Products',
    text: 'Build routines with more confidence and fewer trial-and-error purchases.',
  },
]

export default function HomePage({ setPage }) {
  return (
    <main className="page home-page">
      <section className="hero section">
        <div className="hero-copy">
          <div className="hero-badge">AI-powered skincare intelligence</div>
          <h1>
            Understand your skincare <span>before you use it</span>
          </h1>
          <p>
            DermIQ helps users discover suitable ingredients, avoid likely triggers,
            and build a simpler routine based on skin type, sensitivity, experience,
            and concerns.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setPage('form')}>
              Start Free Analysis
            </button>
            <button className="btn btn-secondary" onClick={() => setPage('results')}>
              View Sample Results
            </button>
          </div>
        </div>

        <div className="hero-card card">
          <h3>Sample Scan</h3>
          <div className="scan-list">
            <div className="scan-item safe">
              <strong>Niacinamide</strong>
              <span>Safe</span>
            </div>
            <div className="scan-item safe">
              <strong>Hyaluronic Acid</strong>
              <span>Safe</span>
            </div>
            <div className="scan-item warn">
              <strong>Fragrance/Parfum</strong>
              <span>Avoid</span>
            </div>
            <div className="scan-item info">
              <strong>Ceramides</strong>
              <span>Barrier Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats-grid">
        {topCards.map((item) => (
          <div key={item.label} className="card stat-card">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <span className="section-tag">How it works</span>
          <h2>From profile to routine in a few steps</h2>
          <p>
            The app turns your skin profile into a visual recommendation dashboard.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <div className="card feature-card" key={card.number}>
              <div className="feature-number">{card.number}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta-banner">
        <div>
          <h2>Ready to decode your skincare?</h2>
          <p>Build your profile and generate a personalized ingredient dashboard.</p>
        </div>
        <button className="btn btn-light" onClick={() => setPage('form')}>
          Analyze Now
        </button>
      </section>
    </main>
  )
}
