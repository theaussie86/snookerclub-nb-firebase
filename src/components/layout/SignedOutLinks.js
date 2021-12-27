import React from 'react'
import { Button, ListItem, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom';

export default function SignedOutLinks(props) {
    const { location } = props;
    return location === 'menu' ?
        <Button component={NavLink} to='/login' color="inherit">Login</Button>
        :
        <li>
            <ListItem button key='login' component={NavLink} to="/login">
                <ListItemText primary='Login' />
            </ListItem>
        </li>
}