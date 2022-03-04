import { convertLength } from '@mui/material/styles/cssUtils';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { Timestamp } from 'firebase/firestore';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react'
import config from '../../util/config';
import { calcRentAsCents, formatDate, formatMoney, formatDuration, getDueDate, convertTimestampToMoment } from '../../util/helpers';

Font.register({
    family: 'Quicksand',
    fonts: [
        {
            src: '/assets/fonts/quicksand-v28-latin-regular.ttf',
        },
        {
            src: '/assets/fonts/quicksand-v28-latin-300.ttf',
            fontWeight: 'light'
        },
        {
            src: '/assets/fonts/quicksand-v28-latin-500.ttf',
            fontWeight: 'medium'
        },
        {
            src: '/assets/fonts/quicksand-v28-latin-600.ttf',
            fontWeight: 'semibold'
        },
        {
            src: '/assets/fonts/quicksand-v28-latin-700.ttf',
            fontWeight: 'bold'
        }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        paddingHorizontal: '2cm',
        paddingBottom: '2cm',
        paddingTop: '3cm',
    },
    section: {
        marginBottom: 36
    },
    text: {
        fontFamily: 'Quicksand',
        fontSize: 12
    },
    heading: {
        fontSize: 18,
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        marginBottom: 2
    },
    column: {
        textAlign: 'center',
        marginVertical: 2
    },
    bold: {
        fontWeight: 'bold'
    },
    footer: {
        fontFamily: 'Quicksand',
        fontSize: 9,
        color: '#3e3e3e'
    }
});

export const BillTemplate = ({ data }) => {
    const { clubName, address, email, iban, bic, bank } = config
    const billDate = useMemo(() => !_.isEmpty(data) ? data.bill.billDate : 0, [data])
    const isTimestamp = useMemo(() => billDate instanceof Timestamp, [billDate])
    const membershipFee = useMemo(() => !_.isEmpty(data) ? data.bill.membershipFee : 0, [data])
    const visitorSales = useMemo(() => !_.isEmpty(data) ? data.bill.visitorSales : 0, [data])
    const rents = useMemo(() => !_.isEmpty(data) ? data.bill.rents : [], [data])
    const user = useMemo(() => !_.isEmpty(data) ? data.user : [], [data])

    console.log(billDate instanceof Timestamp)

    return (
        <Document
            title={'Rechnung ' + formatDate(isTimestamp ? billDate.toDate() : billDate, "MMMM YYYY") + ' ' + user.firstname + ' ' + user.lastname}
            author={clubName}
            subject={'Abrechnung Beitrag und Gastumsätze ' + formatDate(isTimestamp ? billDate.toDate() : billDate, "MMMM YYYY") + ' ' + user.firstname + ' ' + user.lastname}
            language='deutsch'
        >
            <Page
                size="A4"
                style={styles.page}
            >
                <View style={styles.section}>
                    <Text style={styles.heading}>{clubName}</Text>
                    <Text style={[styles.text, { fontSize: 9 }]}>{address}</Text>
                    <Text style={[styles.text, { fontSize: 9 }]}>{email}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <View style={{ flexGrow: 1, paddingVertical: 12 }}>
                        <Text style={[styles.text, styles.bold]}>Mitglied</Text>
                        <Text style={styles.text}>{`${user.firstname} ${user.lastname}`}</Text>
                        <Text style={styles.text}>{user.street}</Text>
                        <Text style={styles.text}>{`${user.zip} ${user.city}`}</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#c1c1c1',
                        padding: 12,
                        alignSelf: 'flex-end'
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexGrow: 1 }}>
                                <Text style={[styles.text, { paddingRight: 6 }]}>Rechnungsnummer:</Text>
                                <Text style={[styles.text, { paddingRight: 6 }]}>Abrechnungszeitraum:</Text>
                                <Text style={[styles.text, { paddingRight: 6 }]}>Rechnungsdatum:</Text>
                            </View>
                            <View>
                                <Text style={styles.text}>{formatDate(isTimestamp ? billDate.toDate() : billDate, "YYYY-MM-") + user.lastname} </Text>
                                <Text style={[styles.text]}>{formatDate(isTimestamp ? billDate.toDate() : billDate, "MMMM YYYY")}</Text>
                                <Text style={[styles.text]}>{formatDate(isTimestamp ? billDate.toDate() : billDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    border: 1,
                    backgroundColor: '#91dba5',
                    marginBottom: 9
                }}>
                    <Text style={[styles.text, styles.column, { width: 90 }]}>Datum</Text>
                    <Text style={[styles.text, styles.column, { flexGrow: 1 }]}>Gastspieler</Text>
                    <Text style={[styles.text, styles.column, { width: 90 }]}>Spielzeit</Text>
                    <Text style={[styles.text, styles.column, { width: 90 }]}>Betrag</Text>
                </View>
                <View style={{ flexGrow: 1 }}>
                    {rents && rents.map((rent, i) => {
                        const isRentTs = rent.datum instanceof Timestamp
                        const dur = isRentTs ? rent.end.toDate() - rent.start.toDate() : (rent.end._seconds - rent.start._seconds) * 1000
                        return (
                            <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                                <Text style={[styles.text, styles.column, { width: 90 }]}>{formatDate(isRentTs ? rent.datum.toDate() : rent.datum)}</Text>
                                <Text style={[styles.text, styles.column, { flexGrow: 1 }]}>{rent.onlyGuests ? rent.player1 + ' und ' + rent.player2 : rent.player2}</Text>
                                <Text style={[styles.text, styles.column, { width: 90 }]}>{formatDuration(dur, null, true)}</Text>
                                <Text style={[styles.text, styles.column, { width: 90 }]}>{formatMoney(calcRentAsCents(dur, rent.onlyGuests), 2, true)}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', borderTop: 1, paddingVertical: 6 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={[styles.text, styles.bold]}>Summe:</Text>
                        <Text style={[styles.text, styles.bold, { width: 90, textAlign: 'center' }]}>{formatMoney(visitorSales, 2, true)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={[styles.text, styles.bold]}>Beitrag {getDueDate(billDate, 'MMMM YYYY')}:</Text>
                        <Text style={[styles.text, styles.bold, { width: 90, textAlign: 'center' }]}>{formatMoney(membershipFee, 2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={[styles.heading, styles.bold]}>Rechnungsbetrag:</Text>
                        <Text style={[styles.heading, styles.bold, { width: 90, textAlign: 'center' }]}>{formatMoney((membershipFee * 100 + visitorSales), 2, true)}</Text>
                    </View>
                </View>
                <Text style={[styles.text, {
                    fontSize: 9,
                    textAlign: 'center',
                    borderBottom: 1,
                    paddingBottom: 3
                }]}>
                    Bitte überweise den Rechnungsbetrag bis zum {getDueDate(billDate)} auf unten stehendes Konto.
                </Text>
                <View style={{ flexDirection: 'row', padding: 6, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.footer}>{clubName}</Text>
                        <Text style={styles.footer}>{address}</Text>
                        <Text style={styles.footer}>{email}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.footer}>Bankverbindung</Text>
                        <Text style={styles.footer}>IBAN: {iban}</Text>
                        <Text style={styles.footer}>BIC: {bic}</Text>
                        <Text style={styles.footer}>Bank: {bank}</Text>
                    </View>
                </View>
                <Text style={[styles.footer, {
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: 30,
                    left: 0,
                    right: 0
                }]} render={({ pageNumber, totalPages }) => (
                    `Seite ${pageNumber} / ${totalPages}`
                )} fixed></Text>
            </Page>
        </Document>
    )

}
