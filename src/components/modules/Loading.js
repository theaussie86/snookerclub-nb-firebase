import { CircularProgress, Container } from '@mui/material'
import React from 'react'
import PageWrapper from '../layout/PageWrapper'

export default function Loading() {
    return (
        <PageWrapper backgroundColor={true}>
            <Container style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress size='6rem' color='warning' />
            </Container>
        </PageWrapper>
    )
}