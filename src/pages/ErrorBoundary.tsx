import React from 'react'

interface Props { children: React.ReactNode; fallback?: React.ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) { super(props); this.state = { hasError: false } }
    static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Error caught in ErrorBoundary:', error, info)
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div style={{ padding: 20 }}>
                    <h2>⚠️ Something went wrong.</h2>
                    <pre>{this.state.error?.message}</pre>
                    <button onClick={() => window.location.reload()}>Reload</button>
                </div>
            )
        }
        return this.props.children
    }
}
