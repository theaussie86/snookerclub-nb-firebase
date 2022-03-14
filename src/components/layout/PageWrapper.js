import React from 'react'
import styled from "styled-components";
import { useTheme } from "@emotion/react";
import { Container, useMediaQuery } from '@mui/material';
import Navbar from '../layout/Navbar'
import Footer from './Footer';

function PageWrapper(props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    const maxWidth = isTablet ? `${theme.breakpoints.values.sm}${theme.breakpoints.unit}` : `${theme.breakpoints.values.md}${theme.breakpoints.unit}`

    const Wrapper = styled.div`
        max-width: ${maxWidth};
        margin: ${isMobile ? '56px' : '64px'} auto 0 auto;
        min-height: calc(100vh - ${isMobile ? '140px' : '128px'});
        display:flex;
        align-items: center;
        justify-content: center;
        padding: ${isMobile ? '0 .5rem' : 'none'}
    `

    const bgColor = typeof props.backgroundColor === 'boolean' ? theme.palette.primary.light : props.backgroundColor;
    const bg = props.background && props.background
    return (
        <>
            <Navbar />
            <Container maxWidth={false} disableGutters={true} style={{
                backgroundColor: props.backgroundColor ? bgColor : 'none',
                ...bg
            }}>
                <Wrapper className={props.className} style={{ ...props.style }}>
                    {props.children}
                </Wrapper>
            </Container>
            <Footer />
        </>
    )
}

export default PageWrapper
