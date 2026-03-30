import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import AnalysisForm from './components/AnalysisForm'
import ResultsPage from './components/ResultsPage'
import Footer from './components/Footer'
import { buildAnalysis } from './utils/buildAnalysis'

export default function App() {
  const [page, setPage] = useState('home')
  const [profile, setProfile] = useState({
    age: 25,
    gender: '',
    skinType: '',
    concerns: [],
    sensitivity: '',
    budget: '',
    experience: '',
  })

  const analysis = useMemo(() => buildAnalysis(profile), [profile])

  return (
    <div className="app-shell">
      <Navbar setPage={setPage} />
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'form' && (
        <AnalysisForm
          setPage={setPage}
          profile={profile}
          setProfile={setProfile}
        />
      )}
      {page === 'results' && (
        <ResultsPage
          setPage={setPage}
          profile={profile}
          analysis={analysis}
        />
      )}
      {page === 'home' && <Footer />}
    </div>
  )
}
