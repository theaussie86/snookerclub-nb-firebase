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
    `

    return (
        <Container maxWidth={false} disableGutters={true} style={{
            backgroundColor: props.backgroundColor ? props.backgroundColor : 'none'
        }}>
            <Wrapper className={props.className}>
                {props.child}
            </Wrapper>
        </Container>
    )
}

export default PageWrapper
