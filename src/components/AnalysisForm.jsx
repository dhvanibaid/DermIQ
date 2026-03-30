import { useState } from 'react'

const steps = ['Personal', 'Skin Type', 'Concerns', 'Sensitivity', 'Preferences']

const concernsList = ['Acne', 'Pigmentation', 'Aging', 'Dullness', 'Hydration', 'Redness']
const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
const sensitivityOptions = ['Low', 'Medium', 'High']
const experienceOptions = ['Beginner', 'Intermediate', 'Advanced']
const budgetOptions = ['Budget', 'Mid-range', 'Premium']
const genderOptions = ['Female', 'Male', 'Other']

export default function AnalysisForm({ setPage, profile, setProfile }) {
  const [step, setStep] = useState(0)
  const [localProfile, setLocalProfile] = useState(profile)

  const update = (key, value) => {
    setLocalProfile((prev) => ({ ...prev, [key]: value }))
  }

  const toggleConcern = (value) => {
    setLocalProfile((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(value)
        ? prev.concerns.filter((item) => item !== value)
        : [...prev.concerns, value],
    }))
  }

  const canContinue = () => {
    if (step === 0) return !!localProfile.gender
    if (step === 1) return !!localProfile.skinType
    if (step === 2) return localProfile.concerns.length > 0
    if (step === 3) return !!localProfile.sensitivity
    if (step === 4) return !!localProfile.budget && !!localProfile.experience
    return true
  }

  const submit = () => {
    setProfile(localProfile)
    setPage('results')
  }

  return (
    <main className="page form-page">
      <section className="section narrow">
        <div className="section-head center">
          <span className="section-tag">Step {step + 1} of {steps.length}</span>
          <h2>Build your skin profile</h2>
          <p>Complete the profile to generate your ingredient dashboard.</p>
        </div>

        <div className="card progress-card">
          <div className="progress-steps">
            {steps.map((label, index) => (
              <div key={label} className={`progress-step ${index === step ? 'active' : index < step ? 'done' : ''}`}>
                <div className="progress-dot">{index + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
          </div>
        </div>

        <div className="card form-card">
          {step === 0 && (
            <div>
              <h3>Basic details</h3>
              <p className="muted">Tell us a little about the user profile.</p>

              <label className="field-label">Age: <strong>{localProfile.age}</strong></label>
              <input
                type="range"
                min="13"
                max="60"
                value={localProfile.age}
                onChange={(e) => update('age', Number(e.target.value))}
                className="range-input"
              />

              <label className="field-label">Gender</label>
              <div className="option-grid three">
                {genderOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`option-card ${localProfile.gender === item ? 'selected' : ''}`}
                    onClick={() => update('gender', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3>Skin type</h3>
              <p className="muted">Choose the primary skin type for this routine.</p>
              <div className="option-grid three">
                {skinTypes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`option-card ${localProfile.skinType === item ? 'selected' : ''}`}
                    onClick={() => update('skinType', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3>Main concerns</h3>
              <p className="muted">Select one or more concerns you want the app to prioritize.</p>
              <div className="chip-wrap">
                {concernsList.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`chip ${localProfile.concerns.includes(item) ? 'selected' : ''}`}
                    onClick={() => toggleConcern(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3>Sensitivity level</h3>
              <p className="muted">This influences how strong or gentle the suggestions should be.</p>
              <div className="option-grid three">
                {sensitivityOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`option-card ${localProfile.sensitivity === item ? 'selected' : ''}`}
                    onClick={() => update('sensitivity', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3>Budget and experience</h3>
              <p className="muted">This helps tailor recommendations and routine complexity.</p>

              <label className="field-label">Budget</label>
              <div className="option-grid three">
                {budgetOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`option-card ${localProfile.budget === item ? 'selected' : ''}`}
                    onClick={() => update('budget', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label className="field-label top-gap">Skincare experience</label>
              <div className="option-grid three">
                {experienceOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`option-card ${localProfile.experience === item ? 'selected' : ''}`}
                    onClick={() => update('experience', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="form-nav">
            <button
              className="btn btn-secondary"
              type="button"
              disabled={step === 0}
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                className="btn btn-primary"
                type="button"
                disabled={!canContinue()}
                onClick={() => setStep((prev) => prev + 1)}
              >
                Continue
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="button"
                disabled={!canContinue()}
                onClick={submit}
              >
                Generate Results
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
