import ResourceList from './ResourceList.jsx'

export default function Workouts() {
  return (
    <ResourceList
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