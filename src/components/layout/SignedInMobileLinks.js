import { Link, ListItem, ListItemText } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import config from "../../util/config";

const { menuPages, userSettings } = config

function SignedInMobileLinks() {
    const { isAdmin, logout } = useAuth()
    const links = menuPages.concat(userSettings)

    return (
        <>
            {links.filter(p => !p.admin || p.admin === isAdmin).map((link) => (
                <li key={link.title}>
                    <ListItem component={link.title !== 'Logout' ? NavLink : Link} to={link.title !== 'Logout' ? link.to : ''} button onClick={link.title === 'Logout' ? logout : null}>
                        <ListItemText primary={link.title} />
                    </ListItem>
                </li>
            ))}
        </>
    )
}

export default SignedInMobileLinks
