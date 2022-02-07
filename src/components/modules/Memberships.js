import { Button, Card, CardContent, CardHeader, CardActions, Typography, Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Tooltip, IconButton } from '@mui/material';
import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, formatMoney } from '../../util/helpers'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
import { useAdmin } from '../../contexts/AdminContext';

function useForceUpdate() {
    const [value, setValue] = useState(0); // eslint-disable-line
    return () => setValue(value => value + 1); // update the state to force render
}

const Memberships = ({ userId }) => {
    const { isAdmin } = useAuth()
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

    return <Container disableGutters style={{ marginTop: '3rem' }}><Card style={{
        alignSelf: 'stretch',
        padding: '1rem'
    }}>
        <CardHeader title={userId ? 'Mitgliedschaften' : 'Meine Mitgliedschaften'} />
        <CardContent>
            {memberships[userId] && Object.keys(memberships[userId]).length > 0
                ? <List>
                    {Object.keys(memberships[userId])
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
                                    primary={`${memberships[userId][mid].type}, Beitrag: ${formatMoney(memberships[userId][mid].fee)}`}
                                    secondary={`Beginn: ${formatDate(memberships[userId][mid].start)}${memberships[userId][mid].end ? ', Ende: ' + formatDate(memberships[userId][mid].end) : ''}`}
                                />
                            </ListItem>
                        ))}
                </List>
                : <Typography paragraph>Keine Mitgliedschaften gefunden</Typography>
            }
        </CardContent>
        {isAdmin && <CardActions>
            <Button
                color='primary'
                LinkComponent={NavLink}
                to={`/membership/${userId}`}
            >Neue Mitgliedschaft anlegen</Button>

        </CardActions>}
    </Card></Container>;
};

export default Memberships;
