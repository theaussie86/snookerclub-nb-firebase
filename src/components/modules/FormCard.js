import { Card } from '@mui/material'
import React from 'react'

function FormCard(props) {

    return (
        <Card component='form' onSubmit={props.onSubmit} style={{ padding: '1rem' }}>
            {props.children}
        </Card>
    )
}

export default FormCard
