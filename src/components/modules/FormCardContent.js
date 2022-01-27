import { CardContent } from '@mui/material'
import React from 'react'

function FormCardContent(props) {
    return (
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            {props.children}
        </CardContent>
    )
}

export default FormCardContent
