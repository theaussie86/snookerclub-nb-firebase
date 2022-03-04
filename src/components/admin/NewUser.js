import { Alert, Button, CardActions, CardHeader, TextField, Link } from '@mui/material'
import React, { useState } from 'react'
import PageWrapper from '../layout/PageWrapper'
import { NavLink } from "react-router-dom";
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';
import { useAdmin } from '../../contexts/AdminContext';

function NewUser() {

    const { createUser } = useAdmin()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email } = e.target.elements

        try {

            const link = await createUser({
                displayName: username.value,
                email: email.value,
                origin: window.location.origin
            })
            setMessage('Mitglied wurde angelegt')

        } catch (error) {
            console.log(error)
            setError(error.toString())
        }
    }

    return (
        <PageWrapper className='page' backgroundColor={true}>
            <FormCard component='form' onSubmit={handleSubmit}>
                <CardHeader title='Neues Mitglied anlegen' />
                <FormCardContent>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {message && <Alert severity='success'>{message}</Alert>}
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
                <CardActions style={{ justifyContent: 'space-between', padding: '1rem' }}>
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
