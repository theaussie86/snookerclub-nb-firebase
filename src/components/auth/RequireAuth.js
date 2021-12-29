import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function RequireAuth({ children }) {
    let { currentUser } = useAuth()
    let location = useLocation()

    if (!currentUser) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth
