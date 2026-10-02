import ResourceList from './ResourceList.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

export default function Teams() {
  return (
    <ResourceList
      endpoint={endpoint}
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