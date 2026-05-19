import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error in subtree:', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    // Optionally reload the page if state reset isn't sufficient
    // window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ maxWidth: 640, width: '100%', textAlign: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h2 style={{ margin: '0 0 8px' }}>Something went wrong</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 16 }}>An unexpected error occurred. Try reloading or come back later.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={this.handleRetry} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Try again</button>
              <button onClick={() => window.location.reload()} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>Reload page</button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
