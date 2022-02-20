import { Accordion, AccordionDetails, AccordionSummary, Button, CardContent, CardHeader, List, ListItem, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PageWrapper from '../layout/PageWrapper'
import ClubCard from '../modules/ClubCard'
import Loading from '../modules/Loading'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { formatDate, formatMoney } from '../../util/helpers';
import { useAuth } from '../../contexts/AuthContext'
import { BillDownloadButton } from '../modules/BillDownloadButton'

const myBills = [
    {
        billDate: new Date(2020, 5, 0),
        membershipFee: 44,
        feePaid: false,
        id: 1,
        salesPaid: true,
        visitorSales: 0,
        _member: 'SCUvynynYtQhkY5qhRMWKt9rOSR2'
    },
    {
        billDate: new Date(2021, 3, 0),
        membershipFee: 60,
        feePaid: false,
        id: 2,
        salesPaid: true,
        visitorSales: 0,
        _member: 'SCUvynynYtQhkY5qhRMWKt9rOSR2'
    },
]

export const Bills = () => {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const { currentUser, isAdmin } = useAuth()

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
                // action={
                //     <Switch checked />
                // }
                />
                <CardContent >
                    {
                        myBills.length ?
                            myBills
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
                                                {formatDate(bill.billDate, 'MMMM YYYY')}
                                            </Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails style={{
                                        display: 'grid',
                                        gridAutoRows: '1fr',
                                        gridTemplate: '1fr 1fr / 1fr 1fr',
                                    }}>
                                        <Typography paragraph style={{ gridArea: '1 /1/ 2/ -1' }}>
                                            Du hast diesen Monat nicht mit Gästen gespielt.
                                        </Typography>
                                        <Typography paragraph fontWeight='bold'>
                                            Beitrag {formatDate(bill.billDate, 'MMMM YYYY')}:
                                        </Typography>
                                        <Typography paragraph fontWeight='bold'>
                                            {formatMoney(bill.membershipFee)}
                                        </Typography>
                                        <Button
                                            variant='contained'
                                            // LinkComponent={NavLink}
                                            // to={`/bills/${bill.id}`}
                                            style={{ gridColumn: 'span 1 /-1' }}
                                        ><BillDownloadButton /></Button>

                                    </AccordionDetails>
                                </Accordion>
                                )
                            : <Typography paragraph>Keine Rechnungen gefunden</Typography>
                    }
                </CardContent>
            </ClubCard>
        </PageWrapper>

}
