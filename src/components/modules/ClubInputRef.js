import { Input } from '@mui/material'
import React, { useEffect } from 'react'

const ClubInputRef = ({ inputRef, ...rest }) => {
    useEffect(() => {
        console.log(rest)
    }, [rest])

    return (
        <Input inputRef={inputRef} {...rest} />
    )
}

export default ClubInputRef