import { textAlign } from '@mui/system';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import React from 'react'
import config from '../../util/config';

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

export const BillTemplate = (props) => {
    const { clubName, address, email, iban, bic, bank } = config
    return (
        <Document
            title={`Rechnung [Mai 2015] [Murat]`}
            author={clubName}
            subject='Abrechnung Beitrag und Gastumsätze [Mai 2015]'
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
                        <Text style={styles.text}>[Name des Mitglieds]</Text>
                        <Text style={styles.text}>[Starße des Mitglieds]</Text>
                        <Text style={styles.text}>[PLZ und Ort des Mitglieds]</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#c1c1c1',
                        padding: 12,
                        alignSelf: 'flex-end'
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexGrow: 1 }}>
                                <Text style={[styles.text, { textAlign: 'right' }]}>Rechnungsnummer:</Text>
                                <Text style={[styles.text, { textAlign: 'right' }]}>Abrechnungszeitraum:</Text>
                                <Text style={[styles.text, { textAlign: 'right' }]}>Fälligkeitsdatum:</Text>
                            </View>
                            <View>
                                <Text style={styles.text}>[NR] </Text>
                                <Text style={[styles.text]}>[ZEITRAUM]</Text>
                                <Text style={[styles.text]}>[DATUM]</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    border: 1,
                    backgroundColor: '#91dba5',
                }}>
                    <Text style={[styles.text, styles.column, { width: 90 }]}>Datum</Text>
                    <Text style={[styles.text, styles.column, { flexGrow: 1 }]}>Gastspieler</Text>
                    <Text style={[styles.text, styles.column, { width: 90 }]}>Spielzeit in h</Text>
                    <Text style={[styles.text, styles.column, { width: 90 }]}>Betrag in €</Text>
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Text>[LOOP]</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', borderTop: 1, paddingVertical: 6 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={[styles.text, styles.bold]}>Summe:</Text>
                        <Text style={[styles.text, styles.bold, { width: 90, textAlign: 'center' }]}>[SUMME]</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={[styles.text, styles.bold]}>Beitrag [Monat]:</Text>
                        <Text style={[styles.text, styles.bold, { width: 90, textAlign: 'center' }]}>[SUMME]</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={[styles.heading, styles.bold]}>Rechnungsbetrag:</Text>
                        <Text style={[styles.heading, styles.bold, { width: 90, textAlign: 'center' }]}>[SUMME]</Text>
                    </View>
                </View>
                <Text style={[styles.text, {
                    fontSize: 9,
                    textAlign: 'center',
                    borderBottom: 1,
                    paddingBottom: 3
                }]}>
                    Bitte überweise den Rechnungsbetrag bis zum [DATUM] auf unten stehendes Konto.
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
