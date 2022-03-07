import React, { useEffect, useState } from 'react'
import {
    PDFViewer
} from '@react-pdf/renderer'
import { BillTemplate } from '../modules/BillTemplate';
import { useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

export const Bill = () => {
    const { content, iv, tag } = useParams()
    const { getBillFromLink } = useData()
    const [bill, setBill] = useState()

    useEffect(() => {
        let isCanceled = false
        const fetchBill = async () => {
            try {
                const res = await getBillFromLink(`/https-fetchBillFromLink`, content, iv, tag)
                setBill(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        if (!bill)
            fetchBill()

        return () => isCanceled = true //eslint-disable-line

    }, [content, iv, tag, getBillFromLink, bill])

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <PDFViewer
                width='100%'
                height='100%'
                style={{ border: 'none' }}
            >
                <BillTemplate data={bill && bill} />
            </PDFViewer>
        </div>
    )
}
