import { CardContent, List, ListItem, IconButton, ListItemAvatar, ListItemText, CardHeader, Switch, CardActions, Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatDate } from '../../util/helpers';
import PageWrapper from '../layout/PageWrapper';
import ClubCard from '../modules/ClubCard';
import DeleteIcon from '@mui/icons-material/Delete'
import UserAvatar from '../modules/UserAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from "react-router-dom";



const Breaks = () => {
    const [onlyMyBreaks, setOnlyMyBreaks] = useState(true);
    const [subheader, setSubheader] = useState('Meine Breaks');
    const { breaks, getAllBreaks, deleteBreak } = useData()
    const { currentUser, isAdmin } = useAuth()

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



    useEffect(() => {
        const fetchAllBreaks = async () => {
            await getAllBreaks();
        }
        if (!breaks.length)
            return fetchAllBreaks()
    }, [breaks, getAllBreaks])

    return <PageWrapper backgroundColor={true} style={{ flexDirection: 'column' }}>
        <ClubCard >
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
                                    secondary={`gespielt am ${formatDate(br.datum.toDate())}`} />
                            </ListItem>
                        ))}
                </List>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button LinkComponent={NavLink} to='/new-break' color="primary" >Neues Break anlegen</Button>
            </CardActions>
        </ClubCard>
    </PageWrapper>;
};

export default Breaks;
