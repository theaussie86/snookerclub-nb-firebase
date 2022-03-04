import { Button } from '@mui/material';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react'
import { BillTemplate } from './BillTemplate';

export const BillDownloadButton = (props) => {
    const { bill } = props
    return (
        <PDFDownloadLink
            document={<BillTemplate data={bill && bill} />}
            fileName='test.pdf'
            style={{ color: 'inherit', textDecoration: 'none' }}
        >
            {({ blob, url, loading, error }) => {
                console.log(blob, url)
                return 'Jetzt herunterladen'
            }}
        </PDFDownloadLink>
    )
}
