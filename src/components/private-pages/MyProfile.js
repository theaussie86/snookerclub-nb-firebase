import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import PageWrapper from '../layout/PageWrapper'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Alert, Button, CardActions, CardHeader, Container, Link, TextField, CardContent, Divider, IconButton, InputAdornment } from '@mui/material'
import FormCard from '../modules/FormCard'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Loading from '../modules/Loading'
import Memberships from '../modules/Memberships'
import { useAdmin } from '../../contexts/AdminContext'

const admins = process.env.REACT_APP_SUPER_ADMINS.split(',')

function MyProfile() {

    const { currentUser,
        updateUserEmail,
        updateUserPassword,
        updateUserProfile,
        updateUserData,
        updateUserPhoneNumber,
    } = useAuth()

    const { createBills } = useAdmin()

    const [searchParams, setSearchParams] = useSearchParams() // eslint-disable-line
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [info, setInfo] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [pwError, setPwError] = useState('')
    const [pw2Error, setPw2Error] = useState('')

    useEffect(() => {
        const m = searchParams.get('m')
        setInfo(m)
    }, [searchParams])

    const { register, handleSubmit, setValue } = useForm({})

    const goBack = () => navigate(-1)

    const handleMouseDown = (e) => {
        e.preventDefault()
    }

    const toggleVisibility = (e) => {
        setIsVisible(!isVisible)
    }

    const handleFormSubmit = handleSubmit((data) => {
        console.log(data)
        const { username, email, phone, password, password2, firstname, lastname, street, zip, city } = data
        const promises = []
        setMessage('')
        setError('')
        setInfo('')

        if (password.length > 0) {
            if (password !== password2) {
                return setPw2Error('Passwörter sind nicht gleich')
            }
            promises.push(updateUserPassword(password))
        }

        if (email !== currentUser.email) {
            promises.push(updateUserEmail(email))
        }

        if (phone !== currentUser.phoneNumber) {
            promises.push(updateUserPhoneNumber(phone))
        }

        if (username !== currentUser.displayName) {// addon PhotoUrl once applicable
            const updateAuthData = {}
            if (username !== currentUser.displayName) updateAuthData.displayName = username
            promises.push(updateUserProfile(updateAuthData))
        }

        if (firstname !== currentUser.additionalData.firstname ||
            lastname !== currentUser.additionalData.lastname ||
            street !== currentUser.additionalData.street ||
            zip !== currentUser.additionalData.zip ||
            city !== currentUser.additionalData.city
        ) {
            const updateData = {}
            if (firstname !== currentUser.additionalData.firstname) updateData.firstname = firstname
            if (lastname !== currentUser.additionalData.lastname) updateData.lastname = lastname
            if (street !== currentUser.additionalData.street) updateData.street = street
            if (zip !== currentUser.additionalData.zip) updateData.zip = zip
            if (city !== currentUser.additionalData.city) updateData.city = city
            promises.push(updateUserData(updateData))
        }

        Promise.all(promises).then(() => {
            setMessage('Daten aktualisiert')
        }).catch((err) => {
            console.error(err)
            setError('FEHLER: ' + err.message)
        })



    }, (error) => {
        console.log('ERROR:', error)
        if (error.password) setPwError(error.password.message)
    })

    const handleClick = async () => {
        console.log('Rechnungen erstellen')
        try {
            const res = await createBills()
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (currentUser.additionalData) {
            setValue('username', currentUser.displayName)
            setValue('email', currentUser.email)
            setValue('phone', currentUser.phoneNumber)
            setValue('firstname', currentUser.additionalData.firstname)
            setValue('lastname', currentUser.additionalData.lastname)
            setValue('street', currentUser.additionalData.street)
            setValue('zip', currentUser.additionalData.zip)
            setValue('city', currentUser.additionalData.city)
        }

    }, [currentUser.additionalData, currentUser]) //eslint-disable-line

    return currentUser ? (
        <PageWrapper backgroundColor={true} style={{ flexDirection: 'column' }}>
            <FormCard onSubmit={handleFormSubmit} style={{ margin: '2rem 0', alignSelf: 'stretch' }}>
                <CardHeader
                    title='Meine Benutzerdaten'
                    action={(currentUser && admins.indexOf(currentUser.uid) > -1)
                        ? <Button variant='contained' onClick={handleClick}>Rechnungen erstellen</Button>
                        : null
                    }
                />
                <CardContent>
                    <Container>
                        {error && <Alert severity='error'>{error}</Alert>}
                        {message && <Alert severity='success'>{message}</Alert>}
                        {info && <Alert severity='warning'>{info}</Alert>}
                    </Container>
                    <Container
                        disableGutters={false}
                        style={{
                            display: 'grid',
                            gridGap: '0 3rem',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(215px,1fr) )'
                        }}
                    >
                        <Container
                            disableGutters={true}
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <TextField
                                {...register('username')}
                                id='username'
                                label='Benutzername'
                                variant='standard'
                                margin='normal'
                                color='primary'
                                name='username'
                            />
                            <TextField
                                {...register('email')}
                                id='email'
                                label='E-Mail-Adresse'
                                variant='standard'
                                margin='normal'
                                color='primary'
                                name='email'
                                type='email'
                            />
                            {/*<TextField
                                {...register('phone')}
                                id='phone'
                                disabled={true}
                                label='Telefonnummer'
                                variant='standard'
                                margin='normal'
                                color='primary'
                                name='phone'
                                defaultValue={currentUser.displayname}
                                helperText={'Kommt bald...'}
                            />*/}
                        </Container>
                        <Container
                            disableGutters={true}
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gridGap: '0 .5rem'
                            }}>
                                <TextField
                                    {...register('firstname')}
                                    id='firstname'
                                    label='Vorname'
                                    variant='standard'
                                    margin='normal'
                                    color='primary'
                                    name='firstname'
                                />
                                <TextField
                                    {...register('lastname')}
                                    id='lastname'
                                    label='Nachname'
                                    variant='standard'
                                    margin='normal'
                                    color='primary'
                                    name='lastname'
                                /></div>
                            <TextField
                                {...register('street')}
                                id='street'
                                label='Straße und Hausnummer'
                                variant='standard'
                                margin='normal'
                                color='primary'
                                name='street'
                            />
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 3fr',
                                gridColumnGap: '.5rem'
                            }}>
                                <TextField
                                    {...register('zip')}
                                    id='zip'
                                    label='PLZ'
                                    variant='standard'
                                    margin='normal'
                                    color='primary'
                                    name='zip'
                                /><TextField
                                    {...register('city')}
                                    id='city'
                                    label='Stadt'
                                    variant='standard'
                                    margin='normal'
                                    color='primary'
                                    name='city'
                                />
                            </div>
                        </Container>
                    </Container>
                    <Divider flexItem={true} style={{ margin: '2rem 1.5rem' }} />
                    <Container style={{
                        display: 'grid',
                        gridGap: '0 3rem',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(215px,1fr) )'
                    }}>
                        <TextField
                            {...register("password", {
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
                            helperText={pwError ? pwError : 'Nur ausfüllen, wenn du dein Passwort ändern möchtest'}
                            type={isVisible ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleVisibility}
                                        onMouseDown={handleMouseDown}
                                        edge="end"
                                    >
                                        {isVisible ? <VisibilityOff /> : <Visibility />}
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
                            helperText={pw2Error ? pw2Error : 'Nur ausfüllen, wenn du dein Passwort ändern möchtest'}
                            type={isVisible ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleVisibility}
                                        onMouseDown={handleMouseDown}
                                        edge="end"
                                    >
                                        {isVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </Container>
                </CardContent>
                <Container >
                    <CardActions style={{ justifyContent: 'space-between', padding: '1rem' }}>
                        <Button
                            color='primary'
                            variant='contained'
                            type='submit'
                        >
                            Ändern
                        </Button>
                        <Link onClick={goBack}>Zurück</Link>
                    </CardActions>
                </Container>
            </FormCard>
            <Memberships userId={currentUser.uid} />
        </PageWrapper>
    ) : (<Loading />)
}

export default MyProfile
