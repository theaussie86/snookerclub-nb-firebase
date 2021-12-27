import { green, red, grey } from '@mui/material/colors';
import { deDE } from '@mui/material/locale'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'


let theme = createTheme({
    palette: {
        // mode: 'dark',
        primary: red,
        secondary: green
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        fontSize: 14,
    },
    deDE,
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'underline 1px rgba(244,67,54,0)',
                    transition: 'text-decoration-color 500ms',
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: grey['900'],
                    color: grey['100'],
                    '& li:hover': {
                        backgroundColor: grey['800']
                    }
                }
            }
        }
    }
})
theme = responsiveFontSizes(theme)

export default theme;