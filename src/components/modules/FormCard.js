import { Card } from '@mui/material'
import React from 'react'

function FormCard(props) {

    return (
        <Card component='form' onSubmit={props.onSubmit}
            sx={{
                ...props.style,
                padding: '1rem',
                minWidth: { xs: 'calc(100% - 1.75rem)', sm: 400 }
            }}>
            {props.children}
        </Card>
    )
}

export default FormCard
