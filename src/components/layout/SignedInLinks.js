import React from 'react'
import { Button, ListItem, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function SignedInLinks(props) {
    const { logout } = useAuth()
    const { location } = props
    return location === 'menu' ?
        <Button onClick={logout} color="inherit">Logout</Button>
        :
        <li>
            <ListItem component={NavLink} to='/logout' button key='logout'>
                <ListItemText primary='Logout' />
            </ListItem>
        </li>
}
