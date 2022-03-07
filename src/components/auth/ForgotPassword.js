import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import PageWrapper from '../layout/PageWrapper'
import { Alert, Button, CardActions, CardHeader, TextField } from '@mui/material'
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';


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

    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <FormCard component='form' onSubmit={handleSubmit}>
                <CardHeader
                    title='Passwort zurücksetzen'
                    subheader='Gib hier die E-Mail-Adresse deines Kontos ein.'
                />
                <FormCardContent>
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

                </FormCardContent>
                <CardActions style={{ justifyContent: 'space-between', padding: '1rem' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        zurücksetzen
                    </Button>
                    <Button component={NavLink} to='/login'>Zum Login</Button>
                </CardActions>
            </FormCard>
        </PageWrapper>
    )
}

export default ForgotPassword
