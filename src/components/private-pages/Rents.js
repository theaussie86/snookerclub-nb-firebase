import { CardContent, List, ListItem, IconButton, ListItemAvatar, ListItemText, CardHeader, Switch, CardActions, Button, Tooltip, Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { formatDate, formatTime, calcRentAsCents, formatMoney } from '../../util/helpers';
import PageWrapper from '../layout/PageWrapper';
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from "react-router-dom";
import Loading from '../modules/Loading';
import ClubCard from '../modules/ClubCard'
import { useAdmin } from '../../contexts/AdminContext';

const Rents = () => {
    const [onlyMyRents, setOnlyMyRents] = useState(true);
    const { getRentsByUserId, myRents } = useData()
    const { currentUser, isAdmin } = useAuth()
    const { getAllRents, allRents, deleteRent } = useAdmin()
    const [loading, setLoading] = useState(true)

    const handleSwitchChange = (e) => {
        setOnlyMyRents(e.target.checked)
    }

    const handleDeleteClick = async (id) => {
        try {
            await deleteRent(id)
        } catch (error) {
            console.error(error)
        }
    }

    const renderListItem = (r, i) => (
        <ListItem key={r.id}
            secondaryAction={isAdmin ?
                <Tooltip title='Spiel mit Gast löschen' placement='top'>
                    <IconButton edge="end" aria-label='delete' data-id={r.id} onClick={() => handleDeleteClick(r.path)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip> : null
            }>
            <ListItemAvatar>
                <Avatar>{i + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={`
            ${r.player2} mit ${r.player1} 
            für ${formatMoney(calcRentAsCents((r.end.seconds - r.start.seconds) * 1000, r.onlyGuests) / 100, 2)}
            `}
                secondary={`
                am ${formatDate(r.datum.toDate())} 
                von ${formatTime(r.start)}
                bis ${formatTime(r.end)}
                `} />
        </ListItem>
    )

    useEffect(() => {
        let isCancelled = false
        const fetchRents = async () => {
            if (isAdmin && !isCancelled) {
                await getAllRents()
            }
            if (!isAdmin && !isCancelled) {
                await getRentsByUserId(currentUser.uid)
            }
            if (!isCancelled)
                setLoading(false)
        }
        fetchRents()
        return () => {
            isCancelled = true
        }
    }, [])//eslint-disable-line


    return loading ? <Loading /> : <PageWrapper backgroundColor={true} style={{ flexDirection: 'column' }}>
        <ClubCard>
            <CardHeader
                title={(isAdmin && !onlyMyRents) ? 'Alle Gäste' : 'Meine Gäste'}
                action={isAdmin &&
                    <Switch checked={onlyMyRents} onChange={handleSwitchChange} />
                } />
            <CardContent>
                {(myRents.length || allRents.length) ? <List>
                    {myRents.length ? myRents.map(renderListItem)
                        : allRents
                            .filter((r) => onlyMyRents ? r._member === currentUser.uid : true)
                            .map(renderListItem)}
                </List> : <Typography paragraph>Keine Gastumsätze für dich gefunden</Typography>}
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button LinkComponent={NavLink} to='/new-rent' color="primary" >Neuen Gast abrechnen</Button>
            </CardActions>
        </ClubCard>
    </PageWrapper>;
};

export default Rents;
