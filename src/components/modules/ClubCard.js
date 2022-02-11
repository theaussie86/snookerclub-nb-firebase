import { Card } from '@mui/material'
import React from 'react'

function FormCard(props) {

    return (
        <Card sx={{
            padding: { sm: '1rem' },
            minWidth: { xs: 1, sm: 400 }
        }}>
            {props.children}
        </Card>
    )
}

export default FormCard