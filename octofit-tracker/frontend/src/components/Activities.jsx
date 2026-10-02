import ResourceList from './ResourceList.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

export default function Activities() {
  return (
    <ResourceList
      endpoint={endpoint}
      resource="activities"
      title="Activities"
      description="Recent training logged by your community."
      fields={[
        { key: 'type', label: 'Activity' },
        { key: 'user', label: 'Athlete' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'distanceKm', label: 'Distance (km)' },
        { key: 'calories', label: 'Calories' },
        { key: 'completedAt', label: 'Completed' },
      ]}
    />
  )
}