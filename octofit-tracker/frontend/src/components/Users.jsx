import ResourceList from './ResourceList.jsx'

export default function Users() {
  return (
    <ResourceList
      resource="users"
      title="Athletes"
      description="Members building healthier habits together."
      fields={[
        { key: 'displayName', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
      ]}
    />
  )
}