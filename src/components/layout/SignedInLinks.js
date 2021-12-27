import React from 'react'
import { Button, ListItem, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function SignedInLinks(props) {
    const { location } = props
    return location === 'menu' ?
        <Button component={NavLink} to='logout' color="inherit">Logout</Button>
        :
        <li>
            <ListItem component={NavLink} to='/logout' button key='logout'>
                <ListItemText primary='Logout' />
            </ListItem>
        </li>
}
