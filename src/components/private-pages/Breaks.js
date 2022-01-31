import { Typography, Card, CardContent, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, CardHeader, Switch, CardActions, Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatDate } from '../../util/helpers';
import PageWrapper from '../layout/PageWrapper';
import DeleteIcon from '@mui/icons-material/Delete'
import UserAvatar from '../modules/UserAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from "react-router-dom";



const Breaks = () => {
    const [onlyMyBreaks, setOnlyMyBreaks] = useState(true);
    const [subheader, setSubheader] = useState('Meine Breaks');
    const { breaks, deleteBreak } = useData()
    const { currentUser, isAdmin } = useAuth()

    console.log(breaks)

    const handleSwitchChange = (e) => {
        console.log(e.target.checked)
        setOnlyMyBreaks(e.target.checked)
        setSubheader(e.target.checked ? 'Meine Breaks' : 'Alle Breaks')
    }

    const handleDeleteClick = async (id) => {
        try {
            await deleteBreak(id)
        } catch (error) {
            console.error(error)
        }

    }

    return <PageWrapper backgroundColor={true} style={{ flexDirection: 'column' }}>
        {/*<Typography variant='h2' component='h1'>Breaks</Typography>*/}
        <Card >
            <CardHeader
                title='Breaks'
                subheader={subheader}
                action={
                    <Switch checked={onlyMyBreaks} onChange={handleSwitchChange} />
                } />
            <CardContent>
                <List>
                    {breaks
                        .filter(b => onlyMyBreaks ? b._member === currentUser.uid : true)
                        .sort((a, b) => a['break'] > b['break'] ? -1 : 1)
                        .map(br => (
                            <ListItem key={br.id}
                                secondaryAction={(br._member === currentUser.uid) || isAdmin ?
                                    <Tooltip title='Break löschen' placement='top'>
                                        <IconButton edge="end" aria-label='delete' data-id={br.id} onClick={() => handleDeleteClick(br.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip> : null
                                }>
                                <ListItemAvatar>
                                    <UserAvatar alt={br.player}>{br.player[0]}</UserAvatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${br['break']} von ${br.player}`}
                                    secondary={`gespielt am ${formatDate(br.datum)}`} />
                            </ListItem>
                        ))}
                </List>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button LinkComponent={NavLink} to='/new-break' color="primary" >Neues Break anlegen</Button>
            </CardActions>
        </Card>
    </PageWrapper>;
};

export default Breaks;
