import ResourceList from './ResourceList.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

export default function Workouts() {
  return (
    <ResourceList
      endpoint={endpoint}
      resource="workouts"
      title="Workouts"
      description="Choose a session that fits your pace."
      fields={[
        { key: 'title', label: 'Workout' },
        { key: 'activityType', label: 'Activity' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'description', label: 'Description' },
      ]}
    />
  )
}