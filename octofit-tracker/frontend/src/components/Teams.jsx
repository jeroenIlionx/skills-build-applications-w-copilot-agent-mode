import ResourceList from './ResourceList.jsx'

export default function Teams() {
  return (
    <ResourceList
      resource="teams"
      title="Teams"
      description="Find a team and see who's training together."
      fields={[
        { key: 'name', label: 'Team' },
        { key: 'description', label: 'About' },
        { key: 'members', label: 'Members' },
      ]}
    />
  )
}