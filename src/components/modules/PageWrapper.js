import React from 'react'
import styled from "styled-components";
import { useTheme } from "@emotion/react";
import { Container, useMediaQuery } from '@mui/material';

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
    `

    const bgColor = typeof props.backgroundColor === 'boolean' ? theme.palette.primary.light : props.backgroundColor;

    return (
        <Container maxWidth={false} disableGutters={true} style={{
            backgroundColor: props.backgroundColor ? bgColor : 'none'
        }}>
            <Wrapper className={props.className}>
                {props.children}
            </Wrapper>
        </Container>
    )
}

export default PageWrapper
