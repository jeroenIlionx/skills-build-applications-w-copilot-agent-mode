import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function displayValue(value) {
  if (value == null || value === '') return '—'
  if (typeof value === 'object') {
    if (Array.isArray(value)) return value.map(displayValue).join(', ')
    return value.displayName || value.username || value.name || value.title || value._id || '—'
  }
  return String(value)
}

export default function ResourceList({ endpoint, resource, title, description, fields }) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then((items) => {
        setRecords(items)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message || 'Unable to load records.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [endpoint, resource])

  return (
    <section aria-labelledby={`${resource}-title`}>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <p className="text-uppercase text-success fw-semibold small mb-2">OctoFit Tracker</p>
          <h1 id={`${resource}-title`} className="h2 fw-semibold mb-2">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <span className="badge text-bg-light border">{records.length} records</span>
      </div>

      {status === 'loading' && <p role="status" className="text-secondary">Loading {title.toLowerCase()}…</p>}
      {status === 'error' && <div role="alert" className="alert alert-danger">{error}</div>}
      {status === 'ready' && records.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} found.</p>
      )}
      {status === 'ready' && records.length > 0 && (
        <div className="table-responsive border rounded-2 bg-white">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>{fields.map((field) => <th scope="col" key={field.key}>{field.label}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || `${resource}-${index}`}>
                  {fields.map((field) => (
                    <td key={field.key}>{displayValue(record[field.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}