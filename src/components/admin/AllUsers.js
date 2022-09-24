import React, { useEffect } from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useAdmin } from '../../contexts/AdminContext'
import { Container, Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Paper } from '@mui/material'
import { NavLink } from "react-router-dom";

function AllUsers() {
    const { users, getAllUsers } = useAdmin()

    useEffect(() => {
        let isCanceled = false
        const fetchUsers = async () => {
            try {
                await getAllUsers()
            } catch (error) {
                console.error(error)
            }
        }

        if (!isCanceled && !users.length) {
            fetchUsers()
        }

        return () => {
            isCanceled = true
        }
    }, [])//eslint-disable-line

    return (
        <PageWrapper backgroundColor={true} style={{ flexDirection: 'column' }}>
            <Typography variant='h1' marginBottom='3rem'>Mitglieder Übersicht</Typography>
            <Container disableGutters style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
                <Container>
                    <Paper style={{ padding: '1rem' }}>
                        <Typography variant='h3' component='h2' marginBottom='1rem'>
                            Aktive Mitglieder
                        </Typography>
                        <List style={{
                            width: '100%',
                            maxWidth: 480,
                            backgroundColor: 'var(--lt-color-background-light)',
                            borderRadius: 16,
                        }}>
                            {Object.keys(users).filter(uid => users[uid].emailVerified === true).map((uid) => {
                                return (
                                    <ListItem key={uid} component={NavLink} to={"/profile/" + users[uid].uid} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={users[uid].displayName}
                                                    src={users[uid].photoUrl}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={users[uid].displayName}
                                                secondary={users[uid].email}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </Container>
                <Container>
                    <Paper style={{ padding: '1rem', marginBottom: '3rem' }}>
                        <Typography variant='h5' component='h3' marginBottom='1rem'>
                            Inaktive Mitglieder
                        </Typography>
                        <List style={{
                            width: '100%',
                            maxWidth: 480,
                            backgroundColor: 'var(--lt-color-background-light)',
                            borderRadius: 16,
                        }}>
                            {Object.keys(users).filter(uid => users[uid].emailVerified === false).map((uid) => {
                                return (
                                    <ListItem key={uid} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={users[uid].displayName}
                                                    src={users[uid].photoUrl}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={users[uid].displayName}
                                                secondary={users[uid].email}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                    <Paper style={{ padding: '1rem' }}>
                        <Typography variant='h5' component='h3' marginBottom="1rem">
                            Administratoren
                        </Typography>
                        <List style={{
                            width: '100%',
                            maxWidth: 480,
                            backgroundColor: 'var(--lt-color-background-light)',
                            borderRadius: 16,
                        }}>
                            {Object.keys(users).filter(uid => users[uid].customClaims && users[uid].customClaims.admin === true).map((uid) => {
                                return (
                                    <ListItem key={uid} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={users[uid].displayName}
                                                    src={users[uid].photoUrl}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={users[uid].displayName}
                                                secondary={users[uid].email}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </Container>
            </Container>
        </PageWrapper>
    )
}

export default AllUsers
