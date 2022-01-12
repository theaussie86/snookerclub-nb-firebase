import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import PageWrapper from '../modules/PageWrapper'
import { useTheme } from '@emotion/react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Alert, Button, Card, CardActions, CardContent, CardHeader, Link, TextField } from '@mui/material'


function Profil() {
    const theme = useTheme()
    // const navigate = useNavigate()
    // const location = useLocation()

    const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password, password2 } = e.target.elements

        const promises = []

        setError('')
        setMessage('')

        if (password.value) {
            if (password.value !== password2.value) {
                return setError('Die Passwörter stimmen nicht überein')
            }
            promises.push(updateUserPassword(password.value))
        }

        if (email.value !== currentUser.email) {
            promises.push(updateUserEmail(email.value))
        }

        Promise.all(promises).then(() => {
            return setMessage('Daten wurden aktualisiert')
        }).catch((error) => {
            return setError('Fehler beim Speichern der Daten')
        })
    }

    const ProfilForm = styled(CardContent)`
            display: flex;
            flex-direction: column;
        `
    const ProfilCard = styled(Card)`
            padding: 1rem;
        `

    return (
        <PageWrapper backgroundColor={true}>
            <ProfilCard component='form' onSubmit={handleSubmit}>
                <CardHeader title='Meine Benutzerdaten' />
                <ProfilForm>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {message && <Alert severity='success'>{message}</Alert>}
                    <TextField
                        id='email'
                        label='E-Mail-Adresse'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        name='email'
                        defaultValue={currentUser.email}
                    />
                    <TextField
                        id='password'
                        label='Password'
                        variant='standard'
                        type='password'
                        margin='normal'
                        color='primary'
                        name='password'
                        helperText='Nur angeben wenn du dein Passwort ändern möchtest'

                    />
                    <TextField
                        id='password2'
                        label='Password wiederholen'
                        variant='standard'
                        type='password'
                        margin='normal'
                        color='primary'
                        name='password2'
                        helperText='Nur angeben wenn du dein Passwort ändern möchtest'
                    />
                </ProfilForm>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Ändern
                    </Button>
                    <Link component={NavLink} to='/'>Abbrechen</Link>
                </CardActions>
            </ProfilCard>
        </PageWrapper>
    )
}

export default Profil
