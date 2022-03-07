import { Alert, Button, CardActions, CardHeader, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import FormCard from '../modules/FormCard'
import FormCardContent from '../modules/FormCardContent'
import PasswordField from '../modules/PasswordField'

export const ResetPassword = ({ params }) => {
    const [error, setError] = useState()
    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const { verifyPasswordReset, confirmPassword, login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { password, password2 } = e.target.elements
        setError('')

        if (password.value !== password2.value) {
            setError('Passwörter stimmen nicht überein. Versuche es erneut.')
            return
        }

        try {
            await confirmPassword(params.oobCode, password.value)
            await login(email, password.value)
            navigate(params.continueUrl ? params.continueUrl : '/')
        } catch (error) {
            console.error(error)
            setError('Fehler beim Abspeichern des Passwortes')
        }
    }

    console.log(params)

    useEffect(() => {
        let isCanceled = false
        const startVerification = async () => {
            try {
                const mail = await verifyPasswordReset(params.oobCode)
                if (!isCanceled)
                    setEmail(mail)
            } catch (error) {
                if (!isCanceled) {
                    console.log(error)
                    setError('Der Link ist fehlerhaft. Wende dich an deinen Admin.')
                    setDisabled(true)
                }
            }
        }
        startVerification()
        return () => {
            isCanceled = true
        }
    }, [])//eslint-disable-line

    return (
        <FormCard onSubmit={handleSubmit}>
            <CardHeader
                title={`Passwort ${email && email + ' '}zurücksetzen`}
                subheader='Gib hier dein neues Passwort ein und bestätige es'
            />
            <FormCardContent>
                {error && <Alert severity='error'>{error}</Alert>}
                <PasswordField
                    id='password'
                    label='Neues Passwort'
                    variant='standard'
                    type='password'
                    required
                    margin='normal'
                    color='primary'
                    name='password'
                    inputProps={{ minLength: 6 }}
                />
                <PasswordField
                    id='password2'
                    label='Neues Passwort bestätigen'
                    variant='standard'
                    type='password'
                    required
                    margin='normal'
                    color='primary'
                    name='password2'
                    inputProps={{ minLength: 6 }}
                />
            </FormCardContent>
            <CardActions style={{ padding: '1rem' }}>
                <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    disabled={disabled}
                >
                    Speichern
                </Button>
            </CardActions>
        </FormCard>
    )
}
