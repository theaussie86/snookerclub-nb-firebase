module.exports = {
    clubName: "1. Snookerclub Neubrandenburg e.V.",
    shortName: "Snookerclub NB",
    author: 'Christoph Weissteiner',
    menuPages: [
        { title: 'Dashboard', to: '/dashboard' },
        { title: 'Mitglied anlegen', to: '/new-user', admin: true },
        { title: 'Alle Mitglieder', to: '/users', admin: true },
    ],
    userSettings: [
        { title: 'Mein Profil', to: '/profile' },
        { title: 'Logout', onclick: 'logout' },
    ]
}