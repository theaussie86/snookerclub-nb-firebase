import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignedInLinks from './SignedInLinks';
import { Box, List, Container, useMediaQuery, SwipeableDrawer, Divider } from '@mui/material';
import SignedOutLinks from './SignedOutLinks';
import styled from 'styled-components';
import { useTheme } from '@emotion/react';
import PoolTableUrl from "../../images/billard-clipart-pool-table-3.png";
import { shortName } from '../../util/config'
import { Link } from 'react-router-dom';



const ClubAppBar = () => {

    const anchor = 'left'
    const [state, setState] = React.useState({ [anchor]: false })
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const PoolTable = styled.img`
        width: 100%;
    `

    const Logo = styled(Link)`
        flex-grow: 1;
        text-align: ${isTablet ? 'center' : 'start'}; 
        color: inherit;
        text-decoration: none;       
    `
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <PoolTable src={PoolTableUrl} />
            <Divider />
            <List>
                <SignedInLinks location="sidebar" />
                <SignedOutLinks location="sidebar" />
            </List>
        </Box>
    );

    return (
        <AppBar style={{ backgroundColor: theme.palette.grey['900'] }}>
            <Container maxWidth='lg'>
                <Toolbar>
                    {isTablet &&
                        <React.Fragment key={anchor}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(anchor, true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                onOpen={toggleDrawer(anchor, true)}
                            >
                                {list(anchor)}
                            </SwipeableDrawer>
                        </React.Fragment>}
                    <Logo to='/'>
                        <Typography variant={isMobile ? 'h6' : "h5"} component="div">
                            {shortName}
                        </Typography>
                    </Logo>

                    {!isTablet && <SignedInLinks location='menu' />}
                    {!isTablet && <SignedOutLinks location='menu' />}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ClubAppBar