import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function RequireAdmin({ children }) {
    const { isAdmin } = useAuth()

    if (!isAdmin) {
        return <Navigate to='/dashboard' replace />
    }

    return children
}

export default RequireAdmin
