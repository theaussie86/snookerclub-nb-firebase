import { Container } from '@mui/material'
import React from 'react'
import PageWrapper from '../modules/PageWrapper'

export default function NotFound() {
    return (
        <PageWrapper child={
            <Container fixed>
                <h1>404 - Not Found</h1>
            </Container>
        } />
    )
}
