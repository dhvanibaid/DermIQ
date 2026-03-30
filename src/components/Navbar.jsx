export default function Navbar({ setPage }) {
  return (
    <header className="nav">
      <button className="nav-logo" onClick={() => setPage('home')}>
        Derm<span>IQ</span>
      </button>

      <nav className="nav-links">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('form')}>Analysis</button>
        <button onClick={() => setPage('results')}>Results</button>
      </nav>

      <button className="nav-cta" onClick={() => setPage('form')}>
        Analyze My Skin
      </button>
    </header>
  )
}
