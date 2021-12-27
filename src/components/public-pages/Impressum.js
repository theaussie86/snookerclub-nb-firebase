import { Container, Link, Typography } from '@mui/material'
import React from 'react'
import PageWrapper from '../modules/PageWrapper'
import styled from 'styled-components'
import { useTheme } from "@emotion/react";

export default function Impressum() {
    const theme = useTheme()
    const PageContainer = styled(Container)`
        padding: 60px 0;
        @media only screen and (max-width: ${theme.breakpoints.values.md}px) {
            padding: 40px 0;
        }
    `
    return (
        <PageWrapper child={
            <PageContainer className='impressum white'>
                <Container>
                    <Typography variant='h2' component='h1' gutterBottom={true}>Impressum</Typography>
                    <Typography paragraph={true}>
                        1. Snookerclub Neubrandenburg e.V.<br />
                        Nonnenhoferstraße 60<br />
                        17033 Neubrandenburg
                    </Typography>
                    <Typography paragraph={true}>Telefon: <Link href="tel:+493954213767">+49 395 4213767</Link><br />
                        E-Mail: <Link href="mailto:snookertempel@gmail.com">snookertempel@gmail.com</Link><br />
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Vertreten durch:</strong><br />
                        Marian Dubowski<br />
                        Robert Taggesell<br />
                        Gerd Habeck
                    </Typography>
                </Container>
                <Container>
                    <Typography variant='h4' component='h2' gutterBottom={true}>Hinweis gemäß Online-Streitbeilegungs-Verordnung</Typography>
                    <Typography paragraph={true}>
                        Nach geltendem Recht sind wir verpflichtet, Verbraucher auf die Existenz der Europäischen Online-Streitbeilegungs-Plattform hinzuweisen, die für die Beilegung von Streitigkeiten genutzt werden kann, ohne dass ein Gericht eingeschaltet werden muss. Für die Einrichtung der Plattform ist die Europäische Kommission zuständig. Die Europäische Online-Streitbeilegungs-Plattform ist hier zu finden: <Link href="http://ec.europa.eu/odr" target="_blank" rel="nofollow noopener noreferrer">http://ec.europa.eu/odr</Link>.
                        Unsere E-Mail lautet: <Link href="mailto:snookertempel@gmail.com">snookertempel@gmail.com</Link>
                    </Typography>
                    <Typography paragraph={true}>
                        Wir weisen aber darauf hin, dass wir nicht bereit sind, uns am Streitbeilegungsverfahren im Rahmen der Europäischen Online-Streitbeilegungs-Plattform zu beteiligen. Nutzen Sie zur Kontaktaufnahme bitte unsere obige E-Mail und Telefonnummer.
                    </Typography>
                </Container>
                <Container>
                    <Typography variant='h4' component='h2' gutterBottom={true}>Disclaimer – rechtliche Hinweise</Typography>
                    <Typography paragraph={true}>§ 1 Warnhinweis zu Inhalten<br />
                        Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des Anbieters.<br />
                    </Typography>
                    <Typography paragraph={true}>
                        § 2 Externe Links<br />
                        Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.<br />
                    </Typography>
                    <Typography paragraph={true}>
                        § 3 Urheber- und Leistungsschutzrechte<br />
                        Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.<br />
                    </Typography>
                    <Typography paragraph={true}>
                        Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.<br />
                    </Typography>
                    <Typography paragraph={true}>
                        § 4 Besondere Nutzungsbedingungen<br />
                        Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
                    </Typography>
                    <Typography paragraph={true}>
                        Quelle: <Link href="https://www.juraforum.de/impressum-generator/">Impressum Vorlage von JuraForum.de</Link>
                    </Typography>
                </Container>
            </PageContainer>
        } />
    )
}
