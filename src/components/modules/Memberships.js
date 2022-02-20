import { Button, CardContent, CardHeader, CardActions, Typography, Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Tooltip, IconButton } from '@mui/material';
import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, formatMoney } from '../../util/helpers'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
import ClubCard from "./ClubCard"
import { useAdmin } from '../../contexts/AdminContext';

function useForceUpdate() {
    const [value, setValue] = useState(0); // eslint-disable-line
    return () => setValue(value => value + 1); // update the state to force render
}

const Memberships = ({ userId }) => {
    const { isAdmin, currentUser, currentMemberships } = useAuth()
    const { memberships, deleteMembership } = useAdmin()
    const forceUpdate = useForceUpdate()

    const handleDeleteClick = async (mid) => {
        try {
            await deleteMembership(userId, mid)
            forceUpdate()
        } catch (error) {
            console.error(error)
        }
    }

    console.log(userId, memberships[userId])

    const renderMemberships = (mems) => (
        <List>
            {Object.keys(mems)
                .map((mid, i) => (
                    <ListItem key={mid}
                        secondaryAction={isAdmin ?
                            <div><Tooltip title='Mitgliedschaft bearbeiten' placement='top' style={{
                                marginRight: '.5rem'
                            }}>
                                <IconButton component={NavLink} to={`/membership/${userId}/${mid}`} edge="end" aria-label='edit' data-id={mid}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                                <Tooltip title='Mitgliedschaft löschen' placement='top'>
                                    <IconButton onClick={() => handleDeleteClick(mid)} edge="end" aria-label='delete' data-id={mid}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div> : null
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>{i + 1}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${mems[mid].type}, Beitrag: ${formatMoney(mems[mid].fee)}`}
                            secondary={`Beginn: ${formatDate(mems[mid].start)}${mems[mid].end ? ', Ende: ' + formatDate(mems[mid].end) : ''}`}
                        />
                    </ListItem>
                ))}
        </List>
    )

    return (
        <ClubCard style={{
            alignSelf: 'stretch',
            padding: '1rem',
            margin: '2rem 0'
        }}>
            <CardHeader title={userId === currentUser.uid ? 'Meine Mitgliedschaften' : 'Mitgliedschaften'} />
            <CardContent>
                {userId === currentUser.uid && currentMemberships && renderMemberships(currentMemberships)}
                {userId !== currentUser.uid && memberships[userId] && renderMemberships(memberships[userId])}
                {!memberships[userId] && !currentMemberships && <Typography paragraph>Keine Mitgliedschaften gefunden</Typography>}
            </CardContent>
            {isAdmin && <CardActions>
                <Button
                    color='primary'
                    LinkComponent={NavLink}
                    to={`/membership/${userId}`}
                >Neue Mitgliedschaft anlegen</Button>

            </CardActions>}
        </ClubCard>
    )
};

export default Memberships;
