import ResultsCharts from './ResultsCharts'

function colorClass(color) {
  if (color === 'blue') return 'blue'
  if (color === 'amber') return 'amber'
  return 'green'
}

export default function ResultsPage({ setPage, profile, analysis }) {
  return (
    <main className="page results-page">
      <section className="section">
        <div className="results-hero">
          <div>
            <h1>Your skincare analysis</h1>
            <p>
              Personalized results based on your skin type, sensitivity, concerns,
              and experience level.
            </p>
            <div className="pill-row">
              <span className="pill">{profile.skinType || 'Skin type not selected'}</span>
              <span className="pill">{profile.sensitivity || 'Sensitivity not selected'}</span>
              <span className="pill">{profile.budget || 'Budget not selected'}</span>
              <span className="pill">{profile.experience || 'Experience not selected'}</span>
            </div>
          </div>
          <button className="btn btn-light" onClick={() => setPage('form')}>
            Edit Profile
          </button>
        </div>
      </section>

      <section className="section two-column">
        <div className="card meter-card">
          <h3>Harshness meter</h3>
          <p className="muted">Lower tolerance means you should stay with gentler routines.</p>
          <div className="meter">
            <div className="meter-track" />
            <div className="meter-needle" style={{ left: `${analysis.harshness}%` }}>
              {analysis.harshness}
            </div>
          </div>
          <div className="meter-labels">
            <span>Gentle</span>
            <span>Moderate</span>
            <span>High caution</span>
          </div>
        </div>

        <div className="card compare-card">
          <h3>Profile summary</h3>
          <div className="compare-list">
            <div><span>Skin fit</span><strong>{analysis.compare.profileFit}</strong></div>
            <div><span>Harshness score</span><strong>{analysis.compare.harshness}/100</strong></div>
            <div><span>Budget</span><strong>{analysis.compare.budget}</strong></div>
            <div><span>Experience</span><strong>{analysis.compare.experience}</strong></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="section-tag">Recommended ingredients</span>
          <h2>Best matches for this profile</h2>
        </div>

        <div className="results-grid">
          {analysis.recommended.map((item) => (
            <article className="card ingredient-card" key={item.name}>
              <div className="ingredient-top">
                <div>
                  <h3>{item.name}</h3>
                  <div className={`status ${colorClass(item.color)}`}>{item.safety}</div>
                </div>
                <div className={`score-badge ${colorClass(item.color)}`}>{item.score}</div>
              </div>

              <p className="ingredient-copy">{item.benefit}</p>

              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag} className={`mini-tag ${colorClass(item.color)}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bar-group">
                {Object.entries(item.bars).map(([label, value]) => (
                  <div key={label}>
                    <div className="bar-label">
                      <span>{label}</span>
                      <strong>{value}%</strong>
                    </div>
                    <div className="bar">
                      <div className={`bar-fill ${colorClass(item.color)}`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="section-tag">Avoid or use carefully</span>
          <h2>Ingredients to watch</h2>
        </div>

        <div className="avoid-grid">
          {analysis.avoid.map((item) => (
            <article className="card avoid-card" key={item.name}>
              <div className="avoid-top">
                <h3>{item.name}</h3>
                <span className="risk-badge">{item.risk} Risk</span>
              </div>
              <p>{item.reason}</p>
              <div className="warning-box">{item.warning}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <ResultsCharts analysis={analysis} />
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Gentler alternatives</h3>
          <div className="stack-list">
            {analysis.alternatives.map((item) => (
              <div className="alt-row" key={`${item.harsh}-${item.gentle}`}>
                <div>
                  <strong>{item.harsh}</strong>
                  <p className="muted">Use less often or replace if irritation happens.</p>
                </div>
                <div className="arrow">→</div>
                <div>
                  <strong>{item.gentle}</strong>
                  <p className="muted">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Value picks</h3>
          <div className="stack-list">
            {analysis.costs.map((item) => (
              <div className="cost-row" key={item.product}>
                <div>
                  <strong>{item.product}</strong>
                  <p className="muted">{item.brand}</p>
                </div>
                <div className="cost-meta">
                  <strong>{item.price}</strong>
                  <span>{item.per100}</span>
                  {item.vfm && <em>Best Value</em>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h3>Suggested routine flow</h3>
          <div className="routine-list">
            {analysis.routine.map((step, index) => (
              <div className={`routine-item ${step.time.toLowerCase()}`} key={`${step.time}-${step.step}-${index}`}>
                <div className="routine-step">{index + 1}</div>
                <div>
                  <strong>{step.time} — {step.step}</strong>
                  <p>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
