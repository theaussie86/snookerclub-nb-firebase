import { Avatar, Button, CardActions, CardContent, CardHeader, Container, List, ListItem, ListItemAvatar, ListItemText, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import PoolTableUrl from "../../images/billard-clipart-pool-table-bg.png";
import PoolTableMobileUrl from "../../images/billard-clipart-pool-table-bg-mobile.png";
import { useData } from '../../contexts/DataContext'
import PageWrapper from '../layout/PageWrapper'
import ClubCard from '../modules/ClubCard'
import { grey } from '@mui/material/colors'
import { useTheme } from '@emotion/react'
import UserAvatar from '../modules/UserAvatar';
import { NavLink } from 'react-router-dom';
import { formatDate, formatTime, formatMoney, calcRentAsCents } from '../../util/helpers'

function Dashboard() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const { breaks, getAllBreaks, myRents, getRentsByUserId } = useData()

    useEffect(() => {
        let isCanceled = false
        const fetchBreaks = async () => {
            try {
                await getAllBreaks()
            } catch (error) {
                console.error(error)
            }
        }

        if (!isCanceled && !breaks.length) {
            fetchBreaks()
        }

        return () => {
            isCanceled = true
        }
    }, [breaks])//eslint-disable-line

    useEffect(() => {
        let isCanceled = false
        const fetchRents = async () => {
            try {
                await getRentsByUserId()
            } catch (error) {
                console.error(error)
            }
        }

        if (!isCanceled && !myRents.length) {
            fetchRents()
        }

        return () => {
            isCanceled = true
        }
    }, [myRents])//eslint-disable-line

    return (
        <PageWrapper backgroundColor={grey[800]} background={{
            backgroundImage: `linear-gradient(to bottom, rgba(66, 66, 66, 0.42), rgba(66, 66, 66, 0.53)),url(${isMobile ? PoolTableMobileUrl : PoolTableUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <Container disableGutters sx={{
                display: 'grid',
                gridTemplate: 'auto 1fr / repeat(auto-fit,minmax(auto,18.75rem))',
                gridGap: '1.5rem',
                justifyContent: 'center',
                margin: '3rem 0'
            }}>
                <ClubCard style={{ gridRow: 'span 2' }}>
                    <CardHeader
                        title='Top 10 Breaks'
                    />
                    <CardContent>
                        <List>
                            {breaks
                                .sort((a, b) => a['break'] > b['break'] ? -1 : 1)
                                .slice(0, 10)
                                .map(br => (
                                    <ListItem key={br.id}>
                                        <ListItemAvatar>
                                            <UserAvatar alt={br.player}>{br.player[0]}</UserAvatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${br['break']} von ${br.player}`}
                                            secondary={`gespielt am ${formatDate(br.datum.toDate())}`} />
                                    </ListItem>
                                ))}
                        </List>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'flex-end' }}>
                        <Button LinkComponent={NavLink} to='/breaks' color="primary" >Meine Breaks ansehen</Button>
                    </CardActions>
                </ClubCard>
                <ClubCard>
                    <CardHeader
                        title='Meine letzten Gäste'
                    />
                    <CardContent>
                        <List>
                            {myRents
                                .sort((a, b) => a['datum'].toDate() > b['break'].toDate() ? -1 : 1)
                                .slice(0, 5)
                                .map((rent, i) => (
                                    <ListItem key={rent.id}>
                                        <ListItemAvatar>
                                            <Avatar>{i + 1}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`
                                    ${rent.player2} mit ${rent.player1} 
                                    für ${formatMoney(calcRentAsCents((rent.end.seconds - rent.start.seconds) * 1000, rent.onlyGuests) / 100, 2)}
                                    `}
                                            secondary={`
                                        am ${formatDate(rent.datum.toDate())} 
                                        von ${formatTime(rent.start)}
                                        bis ${formatTime(rent.end)}
                                        `} />
                                    </ListItem>
                                ))}
                        </List>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'flex-end' }}>
                        <Button LinkComponent={NavLink} to='/rents' color="primary" >Meine Gäste ansehen</Button>
                    </CardActions>
                </ClubCard>
                <ClubCard style={{ alignSelf: 'start' }}>
                    <CardHeader
                        title='Wichtige Links'
                    />
                    <CardContent>
                        <Container disableGutters sx={{
                            display: 'grid',
                            gridGap: '1.5rem',
                            gridTemplateColumns: 'auto',
                            justifyContent: 'center'
                        }}>
                            <Button variant='contained' LinkComponent={NavLink} to='/bills' color="primary" >Meine Rechnungen</Button>
                            <Button variant='contained' LinkComponent={NavLink} to='/profile' color="primary" >Mein Profil</Button>
                        </Container>
                    </CardContent>
                </ClubCard>
            </Container>
        </PageWrapper>
    )
}

export default Dashboard
