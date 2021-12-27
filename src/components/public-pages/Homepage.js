import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import PageWrapper from '../modules/PageWrapper'
import MapComponent from '../modules/MapComponent'


const Homepage = () => {
    const HomeContainer = styled(Container)`
        min-height: inherit;
        display: flex;
        align-items: center;
        padding: 20px;
    `

    return (
        <PageWrapper className='page' backgroundColor='#70be74' child={
            <HomeContainer className="home">
                <Grid container direction="row" justifyContent='center' spacing={2}>
                    <Grid item xs={12} md={8} lg={7} className="col s12 m8 push-m2 l7">
                        <Card className="card" style={{
                            height: '400px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <MapComponent />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} lg={5} className="col s12 m8 push-m2 l5">
                        <Card className="card hoverable center-align" style={{ height: '100%' }}>
                            <CardContent className="card-content">
                                <Typography variant='h4' component='h1' gutterBottom={true}>Snookerclub Neubrandenburg e.V.</Typography>
                                <Typography paragraph={true}>
                                    Nonnenhofer Straße 60<br />
                                    17033 Neubrandenburg
                                </Typography>
                                <Typography variant='h5' component='h2'>Email</Typography>
                                <Typography paragraph={true}>snookertempel@gmail.com</Typography>
                                <Typography variant="h5" component="h2">Preise</Typography>
                                <Typography paragraph={true}>3,50 € pro Person und pro Stunde</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </HomeContainer>
        } />
    )
}

export default Homepage;