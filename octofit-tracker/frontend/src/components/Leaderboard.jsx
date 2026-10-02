import ResourceList from './ResourceList.jsx'

export default function Leaderboard() {
  return (
    <ResourceList
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