import { Alert, Button, CardActions, CardHeader, TextField, Link } from '@mui/material'
import React, { useState } from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useTheme } from "@emotion/react";
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from "react-router-dom";
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';

function NewUser() {
    const theme = useTheme()

    const { createUser } = useAuth()
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email } = e.target.elements

        try {

            const link = await createUser({
                displayname: username.value,
                email: email.value,
                origin: window.location.origin
            })
            console.log('Weiter zum Detailbildschirm des neuen Mitlgieds...', link)

        } catch (error) {
            console.log(error)
            setError(error.toString())
        }
    }

    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <FormCard component='form' onSubmit={handleSubmit}>
                <CardHeader title='Neues Mitglied anlegen' />
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
                    <TextField
                        id='username'
                        label='Benutzername'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        name='username'
                    />
                </FormCardContent>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Erstellen
                    </Button>
                    <Link component={NavLink} to='/users'>Alle Benutzer</Link>
                </CardActions>
            </FormCard>
        </PageWrapper>
    )
}

export default NewUser
