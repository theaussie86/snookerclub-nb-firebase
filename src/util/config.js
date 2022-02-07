import axios from 'axios'

const REGION = 'europe-west1'
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:5001/snookerclub-nb/${REGION}` : `https://${REGION}-snookerclub-nb.cloudfunctions.net/`
})

const config = {
    clubName: "1. Snookerclub Neubrandenburg e.V.",
    shortName: "Snookerclub NB",
    author: 'Christoph Weissteiner',
    REGION: REGION,
    menuPages: [
        { title: 'Dashboard', to: '/dashboard' },
        { title: 'Breaks', to: '/breaks' },
        { title: 'Mitglied anlegen', to: '/new-user', admin: true },
        { title: 'Alle Mitglieder', to: '/users', admin: true },
    ],
    userSettings: [
        { title: 'Mein Profil', to: '/profile' },
        { title: 'Logout', onclick: 'logout' },
    ],
    axios: instance,
    membershipFees: {
        'Vollmitglied': 50,
        'Vollmitglied_alt': 60
    }
}

export default config