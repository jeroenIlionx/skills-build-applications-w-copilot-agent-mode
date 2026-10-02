import ResourceList from './ResourceList.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

export default function Leaderboard() {
  return (
    <ResourceList
      endpoint={endpoint}
      resource="leaderboard"
      title="Leaderboard"
      description="See who's leading the OctoFit challenge."
      fields={[
        { key: 'user', label: 'Athlete' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}