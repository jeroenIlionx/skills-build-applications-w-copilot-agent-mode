import ResourceList from './ResourceList.jsx'

export default function Activities() {
  return (
    <ResourceList
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