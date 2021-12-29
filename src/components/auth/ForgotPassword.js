import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import PageWrapper from '../modules/PageWrapper'
import styled from 'styled-components'
import { Alert, Button, Card, CardActions, CardContent, CardHeader, TextField, Link } from '@mui/material'


function ForgotPassword() {
    const theme = useTheme()
    const navigate = useNavigate()

    const { currentUser, resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (currentUser) {
            navigate(-1)
        }
    }, [currentUser, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email } = e.target.elements

        try {
            setError('')
            setMessage('')
            await resetPassword(email.value)
            setMessage('Du hast eine E-Mail mit weiteren Anweisungen bekommen')

        } catch (error) {

            if (error.toString().indexOf('auth/user-not-found') > -1) {
                setError('Es gibt keinen Benutzer mit dieser E-Mail-Adresse')
            }

        }
    }

    const ForgotPasswordForm = styled(CardContent)`
        display: flex;
        flex-direction: column;
    `
    const ForgotPasswordCard = styled(Card)`
        padding: 1rem;
    `
    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <ForgotPasswordCard component='form' onSubmit={handleSubmit}>
                <CardHeader title='Passwort zurücksetzen' />
                <ForgotPasswordForm>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {message && <Alert severity='info'>{message}</Alert>}
                    <TextField
                        id='email'
                        label='E-Mail-Adresse'
                        variant='standard'
                        required
                        margin='normal'
                        color='primary'
                        name='email'
                        type='email'
                    />

                </ForgotPasswordForm>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        zurücksetzen
                    </Button>
                    <Link component={NavLink} to='/login'>Zum Login</Link>
                </CardActions>
            </ForgotPasswordCard>
        </PageWrapper>
    )
}

export default ForgotPassword
