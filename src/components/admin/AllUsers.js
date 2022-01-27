import React, { useEffect } from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useAdmin } from '../../contexts/AdminContext'
import { Container, Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Paper } from '@mui/material'
import { NavLink } from "react-router-dom";

function AllUsers() {
    const { users, setUsers, getAllUsers, setLoading } = useAdmin()
    console.log(users)

    // useEffect(() => {
    //     if (users.length === 0) {
    //         setLoading(true)
    //         return getAllUsers()/*.then(usersResponse => {
    //             setLoading(false)
    //             setUsers(usersResponse.data)
    //         });*/
    //     } else {
    //         return users
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [users]);

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
                            {users.filter(u => u.disabled === false).map((user) => {
                                return (
                                    <ListItem key={user.uid} component={NavLink} to={"/profile/" + user.uid} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={user.displayName}
                                                    src={user.photoUrl}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user.displayName}
                                                secondary={user.email}
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
                            {users.filter(u => u.disabled === true).map((user) => {
                                return (
                                    <ListItem key={user.uid} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={user.displayName}
                                                    src={user.photoUrl}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user.displayName}
                                                secondary={user.email}
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
                            {users.filter(u => u.customClaims && u.customClaims.admin === true).map((user) => {
                                return (
                                    <ListItem key={user.uid} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={user.displayName}
                                                    src={user.photoUrl}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user.displayName}
                                                secondary={user.email}
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
