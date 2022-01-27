import { Container } from '@mui/material'
import React from 'react'
import PageWrapper from '../layout/PageWrapper'

export default function NotFound() {
    return (
        <PageWrapper>
            <Container fixed>
                <h1>404 - Not Found</h1>
            </Container>
        </PageWrapper>
    )
}
