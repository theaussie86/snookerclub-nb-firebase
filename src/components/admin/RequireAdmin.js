import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function RequireAdmin({ children }) {
    let { isAdmin } = useAuth()

    if (!isAdmin) {
        return <Navigate to='/dashboard' replace />
    }

    return children
}

export default RequireAdmin
