import { Alert, Button, CardActions, CardHeader, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useTheme } from "@emotion/react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';

function ActivateUser() {
    const theme = useTheme()
    const navigate = useNavigate()

    const { checkSignInLink, signInWithLink } = useAuth()
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (!checkSignInLink(window.location.href)) {
            setError('Der Link ist fehlerhaft. Wende dich an den Admin.')
            setDisabled(true)
        }
    }, [checkSignInLink])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email } = e.target.elements
        try {
            await signInWithLink(email.value, window.location.href)
            navigate('/set-password')
        } catch (error) {
            setError(error.toString())
        }
    }

    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <FormCard onSubmit={handleSubmit}>
                <CardHeader title='Konto aktivieren' />
                <Typography paragraph style={{ padding: '1rem' }}>Gib hier nochmal deine E-Mail-Adresse ein,<br /> um dein Konto zu aktivieren.</Typography>
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
                </FormCardContent>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        disabled={disabled}
                        style={{ flexGrow: 1 }}
                    >
                        Aktivieren
                    </Button>
                </CardActions>
            </FormCard>
        </PageWrapper>
    )
}

export default ActivateUser
