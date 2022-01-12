import React from 'react'
import SignedInDesktopLinks from './SignedInDesktopLinks'
import SignedInMobileLinks from './SignedInMobileLinks'

export default function SignedInLinks(props) {
    const { location } = props
    return location === 'menu' ? <SignedInDesktopLinks /> : <SignedInMobileLinks />
}
