import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const PasswordField = (props) => {
    const [isvisible, setIsvisible] = useState(false)
    const handleMouseDown = (e) => {
        e.preventDefault()
    }

    const toggleVisibility = (e) => {
        setIsvisible(!isvisible)
    }

    return (
        <TextField
            {...props}
            type={isvisible ? 'text' : 'password'}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleVisibility}
                        onMouseDown={handleMouseDown}
                        edge="end"
                    >
                        {isvisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }}
        />
    )
}

export default PasswordField
