import { Avatar, Box, Button, IconButton, Link, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { menuPages, userSettings } from "../../util/config";

function SignedInDesktopLinks() {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { isAdmin, logout } = useAuth()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box style={{ justifyContent: 'space-between', display: { xs: 'none', md: 'flex' } }}>
            {
                menuPages.filter(p => !p.admin || p.admin === isAdmin).map((page) => (
                    <Button key={page.title} component={NavLink} to={page.to} color="inherit">{page.title}</Button>
                ))
            }
            <Tooltip title="Einstellungen öffnen">
                <IconButton onClick={handleOpenUserMenu} style={{ padding: 0, marginLeft: '1rem' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                style={{ marginTop: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {userSettings.map((setting) => (
                    <MenuItem key={setting.title} component={setting.title !== 'Logout' ? NavLink : Link} to={setting.title !== 'Logout' ? setting.to : ''} onClick={setting.title === 'Logout' ? logout : handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default SignedInDesktopLinks
