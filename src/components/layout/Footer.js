import { Typography, useMediaQuery } from '@mui/material'
import { NavLink } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import { useTheme } from "@emotion/react";
import config from '../../util/config'
const { author } = config


function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const ClubFooterContent = styled.div`
        display: grid;
        grid: ${isMobile ? '1fr 1fr' : '1fr'} / ${isMobile ? 'max-content min-content' : 'max-content min-content min-content'};
        grid-gap: 0 5%;
        justify-content: center;
        align-items: center;
        min-height: 64px;
        color: ${theme.palette.grey['500']};
    `
    const ClubFooter = styled.footer`
        width: 100vw;
        position: realtive;
        top: auto;
        bottom: 0;
        left: 0;
        right: auto;
        background-color: ${theme.palette.grey['900']};
        padding: ${isMobile ? '10px 0' : '0'};
    `

    const ClubFooterLink = styled(NavLink)`
        text-decoration: none;
        color: inherit;
        &.active{
            text-decoration: underline;
        }
    `

    return (
        <ClubFooter>
            <ClubFooterContent>
                <Typography variant='p' sx={{ gridArea: isMobile ? '1 / span 2' : 'span 1' }}>© {new Date().getFullYear()} {author}</Typography>
                <ClubFooterLink to='/impressum'>Impressum</ClubFooterLink>
                <ClubFooterLink to='/datenschutz'>Datenschutz</ClubFooterLink>
            </ClubFooterContent>
        </ClubFooter>
    )
}

export default Footer
