import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react'
import { BillTemplate } from './BillTemplate';

export const BillDownloadButton = (props) => {
    const { bill } = props
    const billDate = bill.bill.billDate
    const lastname = bill.user.lastname
    const fileNameParts = [billDate.toDate().getFullYear(), billDate.toDate().getMonth() < 9 ? '0' + (billDate.toDate().getMonth() + 1) : billDate.toDate().getMonth() + 1, lastname]
    return (
        <PDFDownloadLink
            document={<BillTemplate data={bill && bill} />}
            fileName={fileNameParts.join('-') + '.pdf'}
            style={{ color: 'inherit', textDecoration: 'none' }}
        >
            {({ blob, url, loading, error }) => {
                return 'Jetzt herunterladen'
            }}
        </PDFDownloadLink>
    )
}
