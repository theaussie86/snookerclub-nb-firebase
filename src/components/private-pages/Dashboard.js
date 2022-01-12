import { Button } from '@mui/material'
import React from 'react'
import PageWrapper from '../modules/PageWrapper'
import { useAuth } from '../../contexts/AuthContext'

function Dashboard() {
    const { currentUser, giveAdminPrivileges } = useAuth()

    const handleClick = async (e) => {
        const idToken = await currentUser.getIdToken()
        console.log(idToken)
    }
    return (
        <PageWrapper>
            Dashboard
            <Button onClick={handleClick}>Zum Admin machen</Button>
        </PageWrapper>
    )
}

export default Dashboard
