import { Accordion, AccordionDetails, AccordionSummary, Button, CardContent, CardHeader, List, ListItem, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PageWrapper from '../layout/PageWrapper'
import ClubCard from '../modules/ClubCard'
import Loading from '../modules/Loading'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { formatDate, formatMoney, formatDuration, calcRentAsCents, getDueDate } from '../../util/helpers';
import { useAuth } from '../../contexts/AuthContext'
import { BillDownloadButton } from '../modules/BillDownloadButton'
import { useData } from '../../contexts/DataContext'

export const Bills = () => {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [error, setError] = useState('')
    const { currentUser, isAdmin } = useAuth()
    const { myBills, getBillsByUserId } = useData()

    useEffect(() => {
        let isCancelled = false
        const fetchBills = async () => {
            if (!isCancelled)
                await getBillsByUserId()
        }
        fetchBills()
        return () => {
            isCancelled = true
        }
    }, [])//eslint-disable-line

    console.log(myBills.length && myBills[0].billDate.toDate())

    const handleChange = (bid) => (event, isExpanded) => {
        setExpanded(isExpanded ? bid : false)
    }

    const sortFunction = (a, b) => a.billDate > b.billDate ? -1 : 1

    return loading ? <Loading />
        : <PageWrapper backgroundColor={true} style={{ flexDirection: 'column' }}>
            <ClubCard style={{
                backgroundColor: expanded ? 'grey.200' : 'background.default'
            }}>
                <CardHeader
                    title='Meine Rechnungen'
                />
                <CardContent >
                    {
                        myBills && myBills.filter(bill => 'visitorSales' in bill).length ?
                            myBills
                                .filter(bill => 'visitorSales' in bill)
                                .sort(sortFunction)
                                .map((bill, i) => <Accordion
                                    key={bill.id}
                                    expanded={expanded === bill.id}
                                    onChange={handleChange(bill.id)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`${bill.id} Content`}
                                        id={`${bill.id}-header`}
                                    >
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            width: '100%'
                                        }}>
                                            <Typography>
                                                {currentUser.displayName}
                                            </Typography>
                                            <Typography>
                                                {formatDate(bill.billDate.toDate(), 'MMMM YYYY')}
                                            </Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails style={{
                                        display: 'grid',
                                        gridAutoRows: '1fr',
                                        gridTemplate: '1fr 1fr / 2fr 1fr',
                                        justifyItems: 'end'
                                    }}>
                                        <div style={{ gridColumn: '1 / -1', justifySelf: 'center', marginTop: '1.5em' }}
                                        >
                                            {(bill.rents && bill.rents.length)
                                                ? bill.rents.map((rent, i) => <div key={i} style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 3fr 1fr',
                                                    justifyItems: 'center',
                                                    alignItems: 'center',
                                                    gridGap: '.5em'
                                                }}>
                                                    <Typography paragraph fontWeight='bold'>{formatDate(rent.datum.toDate())}</Typography>
                                                    <Typography paragraph                                                >
                                                        {`${formatDuration(rent.end.toDate() - rent.start.toDate())} ${!rent.onlyGuests ? 'mit ' + rent.player2 : rent.player1 + ' und ' + rent.player2}`}
                                                    </Typography>
                                                    <Typography paragraph>{formatMoney(calcRentAsCents(rent.end.toDate() - rent.start.toDate(), rent.onlyGuests), 2, true)}</Typography>
                                                </div>)
                                                : <Typography paragraph
                                                >
                                                    Du hast diesen Monat nicht mit Gästen gespielt.
                                                </Typography>}
                                        </div>
                                        <Typography paragraph fontWeight='bold' marginTop='1rem'>
                                            Gastumsätze {formatDate(bill.billDate.toDate(), 'MMMM YYYY')}:
                                        </Typography>
                                        <Typography paragraph fontWeight='bold' marginTop='1rem' style={{ justifySelf: 'center' }}>
                                            {formatMoney(bill.visitorSales, 2, true)}
                                        </Typography>
                                        <Typography paragraph fontWeight='bold'>
                                            Beitrag {getDueDate(bill.billDate, 'MMMM YYYY')}:
                                        </Typography>
                                        <Typography paragraph fontWeight='bold' style={{ justifySelf: 'center' }}>
                                            {formatMoney(bill.membershipFee)}
                                        </Typography>
                                        <div style={{ gridColumn: '1/ -1' }}>
                                            <Button
                                                variant='contained'
                                            ><BillDownloadButton bill={{ bill, user: currentUser.additionalData }} />
                                            </Button>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                )
                            : <Typography paragraph>Keine Rechnungen gefunden</Typography>
                    }
                </CardContent>
            </ClubCard>
        </PageWrapper>

}
