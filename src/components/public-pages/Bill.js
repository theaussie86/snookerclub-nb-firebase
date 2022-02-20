import React, { useEffect } from 'react'
import {
    PDFViewer
} from '@react-pdf/renderer'
import { BillTemplate } from '../modules/BillTemplate';
import { useParams } from 'react-router-dom';


export const Bill = () => {
    const { id } = useParams()
    console.log(id)
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <PDFViewer
                width='100%'
                height='100%'
                style={{ border: 'none' }}
            >
                <BillTemplate />
            </PDFViewer>
        </div>
    )
}
