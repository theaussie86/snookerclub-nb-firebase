import { useTheme } from '@emotion/react'
import { Avatar } from '@mui/material'
import React from 'react'


function UserAvatar({ children, ...rest }) {
    const theme = useTheme()
    return (
        <Avatar {...rest} style={{ backgroundColor: theme.palette.primary.main }}>{children}</Avatar>
    )
}

export default UserAvatar
