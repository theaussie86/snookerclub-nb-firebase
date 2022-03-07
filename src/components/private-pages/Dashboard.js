import { Button } from '@mui/material'
import React from 'react'
// import { useAuth } from '../../contexts/AuthContext'
import { useData } from '../../contexts/DataContext'
import PageWrapper from '../layout/PageWrapper'

function Dashboard() {
    const { getBillFromLink } = useData()

    const handleClick = async (e) => {
        try {
            const res = await getBillFromLink('/https-fetchBillFromLink/dm8Yob6r/AfSAewc%2Bf4PWL3P3/YhHZzs2WJr712IY%2FrtHlyQ%3D%3D')
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <PageWrapper>
            <Button variant="contained" onClick={handleClick}>Test Starten</Button>
        </PageWrapper>
    )
}

export default Dashboard
