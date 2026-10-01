import { NavLink, Route, Routes } from 'react-router-dom'

const sections = [
  { path: '/', label: 'Overview' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white">
        <nav className="navbar navbar-expand-md container py-3" aria-label="Main navigation">
          <NavLink className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {sections.map((section) => (
              <NavLink
                key={section.path}
                className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ''}`}
                to={section.path}
                end={section.path === '/'}
              >
                {section.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container py-5">
        <Routes>
          {sections.map((section) => (
            <Route
              key={section.path}
              path={section.path}
              element={
                <section aria-labelledby="page-title">
                  <p className="text-uppercase text-success fw-semibold small mb-2">OctoFit Tracker</p>
                  <h1 id="page-title" className="display-6 fw-semibold mb-3">
                    {section.label}
                  </h1>
                  <p className="text-secondary mb-0">No records yet.</p>
                </section>
              }
            />
          ))}
          <Route
            path="*"
            element={
              <section aria-labelledby="not-found-title">
                <h1 id="not-found-title" className="h2">Page not found</h1>
                <NavLink to="/">Return to overview</NavLink>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
