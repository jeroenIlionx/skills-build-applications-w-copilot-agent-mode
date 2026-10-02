import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { path: '/activities', label: 'Activities', component: Activities },
  { path: '/teams', label: 'Teams', component: Teams },
  { path: '/leaderboard', label: 'Leaderboard', component: Leaderboard },
  { path: '/users', label: 'Athletes', component: Users },
  { path: '/workouts', label: 'Workouts', component: Workouts },
]

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white">
        <nav className="navbar navbar-expand-md container py-3" aria-label="Main navigation">
          <NavLink className="navbar-brand fw-semibold" to="/activities">OctoFit Tracker</NavLink>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {sections.map(({ path, label }) => (
              <NavLink
                key={path}
                className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ''}`}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Activities />} />
          {sections.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<section><h1 className="h2">Page not found</h1><NavLink to="/activities">View activities</NavLink></section>} />
        </Routes>
      </main>
    </div>
  )
}

export default App