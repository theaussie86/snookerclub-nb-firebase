import { Alert, Button, Card, CardActions, CardContent, CardHeader, TextField, Link } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PageWrapper from '../modules/PageWrapper'
import styled from 'styled-components';
import { useTheme } from "@emotion/react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function Login() {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from.pathname : '/'

    console.log(location)

    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')

    useEffect(() => {
        if (currentUser) {
            navigate(-1)
        }
    }, [currentUser, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, password } = e.target.elements

        try {

            await login(username.value, password.value)
            navigate(from, { replace: true })

        } catch (error) {

            if (error.toString().indexOf('auth/user-not-found') > -1) {
                setError('Benutzer konnte nicht gefunden werden')
            } else if (error.toString().indexOf('auth/wrong-password') > -1) {
                setError('Falsches Passwort')
            }

        }
    }

    const LoginForm = styled(CardContent)`
        display: flex;
        flex-direction: column;
    `
    const LoginCard = styled(Card)`
        padding: 1rem;
    `

    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <LoginCard component='form' onSubmit={handleSubmit}>
                <CardHeader title='Gebe hier deine Anmeldedaten ein' />
                <LoginForm>
                    {error && <Alert severity='error'>{error}</Alert>}
                    <TextField
                        id='username'
                        label='Benutzername'
                        variant='standard'
                        required
                        margin='normal'
                        color='primary'
                        name='username'
                    />
                    <TextField
                        id='password'
                        label='Password'
                        variant='standard'
                        type='password'
                        margin='normal'
                        color='primary'
                        required
                        name='password'
                    />
                </LoginForm>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Anmelden
                    </Button>
                    <Link component={NavLink} to='/forgot-password'>Passwort vergessen?</Link>
                </CardActions>
            </LoginCard>
        </PageWrapper>
    )
}

export default Login
