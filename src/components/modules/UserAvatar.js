import { useTheme } from '@emotion/react'
import { Avatar } from '@mui/material'
import React from 'react'


function UserAvatar(props) {
    const theme = useTheme()
    return (
        <Avatar {...props} style={{ backgroundColor: theme.palette.primary.main }} />
    )
}

export default UserAvatar
