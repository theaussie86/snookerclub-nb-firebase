import { Alert, Button, CardActions, CardHeader, TextField, Link } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useTheme } from "@emotion/react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';
import PasswordField from '../modules/PasswordField';

function Login() {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from.pathname : '/'

    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')

    useEffect(() => {
        if (currentUser) {
            navigate(-1)
        }
    }, [currentUser, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = e.target.elements

        try {

            await login(email.value, password.value)
            navigate(from, { replace: true })

        } catch (error) {

            if (error.toString().indexOf('auth/user-not-found') > -1) {
                setError('Benutzer konnte nicht gefunden werden')
            } else if (error.toString().indexOf('auth/wrong-password') > -1) {
                setError('Falsches Passwort')
            }

        }
    }

    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <FormCard onSubmit={handleSubmit}>
                <CardHeader title='Gebe hier deine Anmeldedaten ein' />
                <FormCardContent>
                    {error && <Alert severity='error'>{error}</Alert>}
                    <TextField
                        id='email'
                        label='E-Mail-Adresse'
                        variant='standard'
                        type='email'
                        required
                        margin='normal'
                        color='primary'
                        name='email'
                    />
                    <PasswordField
                        id='password'
                        label='Password'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        required
                        name='password'
                    />
                </FormCardContent>
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
            </FormCard>
        </PageWrapper>
    )
}

export default Login
