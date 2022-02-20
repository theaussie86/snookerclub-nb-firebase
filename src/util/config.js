import axios from 'axios'

const REGION = 'europe-west1'
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:5001/snookerclub-nb/${REGION}` : `https://${REGION}-snookerclub-nb.cloudfunctions.net/`
})

const config = {
    clubName: "1. Snookerclub Neubrandenburg e.V.",
    shortName: "Snookerclub NB",
    address: 'Nonnenhofer Straße 60, 17033 Neubrandenburg',
    email: 'snookertempel@gmail.com',
    iban: 'DE20 1504 0068 0686 0902 00',
    bic: 'COBADEFFXXX',
    bank: 'Commerzbank',
    author: 'Christoph Weissteiner',
    REGION: REGION,
    menuPages: [
        { title: 'Dashboard', to: '/dashboard' },
        { title: 'Breaks', to: '/breaks' },
        { title: 'Gäste', to: '/rents' },
        { title: 'Rechnungen', to: '/bills' },
    ],
    userSettings: [
        { title: 'Mein Profil', to: '/profile' },
        { title: 'Mitglied anlegen', to: '/new-user', admin: true },
        { title: 'Alle Mitglieder', to: '/users', admin: true },
        { title: 'Logout', onclick: 'logout' },
    ],
    axios: instance,
    membershipFees: {
        'Vollmitglied': 50,
        'Vollmitglied_alt': 60
    }
}

export default config