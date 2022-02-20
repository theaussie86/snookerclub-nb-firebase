import { useTheme } from '@emotion/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import PageWrapper from '../layout/PageWrapper'
import { Alert, Button, CardActions, CardHeader, IconButton, InputAdornment, TextField } from '@mui/material'
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';
import { Visibility, VisibilityOff } from '@mui/icons-material'

const SetPassword = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const message = 'Gib hier dein gewünschtes Passwort ein.'
    const { updateUserPassword } = useAuth()
    const { register, handleSubmit } = useForm({
        password: '',
        password2: ''
    })
    const [pwError, setPwError] = useState('')
    const [pw2Error, setPw2Error] = useState('')
    const [error, setError] = useState('')
    const [isvisible, setIsvisible] = useState(false)
    const handleMouseDown = (e) => {
        e.preventDefault()
    }

    const toggleVisibility = (e) => {
        setIsvisible(!isvisible)
    }

    const handleFormSubmit = handleSubmit(async (data) => {
        const { password, password2 } = data
        setPwError('')
        setPw2Error('')
        if (password !== password2) {
            return setPw2Error('Passwörter sind nicht gleich')
        }

        try {
            await updateUserPassword(password)
            const notification = encodeURIComponent('Überprüfe deine Details und ändere diese gegebenenfalls.')
            navigate('/profile?m=' + notification)
        } catch (error) {
            console.error(error)
            if (error.toString().indexOf('auth/requires-recent-login') > -1) {
                setError('Du hast zu lange gebraucht. Lass dir einen neuen Link zuschicken')
            }
        }
    }, (errors) => {
        console.log(errors)
        if (errors.password) setPwError(errors.password.message)
    })

    return (
        <PageWrapper className='page' backgroundColor={theme.palette.primary.light}>
            <FormCard component='form' onSubmit={handleFormSubmit}>
                <CardHeader title='Passwort vergeben' />
                <FormCardContent>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {message && <Alert severity='info'>{message}</Alert>}
                    <TextField
                        {...register("password", {
                            required: 'Passwort fehlt.',
                            minLength: {
                                value: 8,
                                message: 'Passwort muss mindestens 8 Zeichen lang sein.'
                            },

                        })}
                        label='Passwort'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        error={!!pwError}
                        helperText={pwError ? pwError : ''}
                        type={isvisible ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleVisibility}
                                    onMouseDown={handleMouseDown}
                                    edge="end"
                                >
                                    {isvisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    <TextField
                        {...register('password2',)}
                        label='Passwort wiederholen'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        error={!!pw2Error}
                        helperText={pw2Error ? pw2Error : ''}
                        type={isvisible ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleVisibility}
                                    onMouseDown={handleMouseDown}
                                    edge="end"
                                >
                                    {isvisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </FormCardContent>
                <CardActions style={{ justifyContent: 'space-between', padding: '1rem' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Passwort setzen
                    </Button>
                </CardActions>
            </FormCard>
        </PageWrapper>
    )
}

export default SetPassword
