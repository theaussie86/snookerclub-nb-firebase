import { Container, Link, Typography } from '@mui/material'
import React from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useTheme } from "@emotion/react";
import styled from "styled-components";

export default function Datenschutz() {
    const theme = useTheme()
    const PageContainer = styled(Container)`
        padding: 60px 0;
        @media only screen and (max-width: ${theme.breakpoints.values.md}px) {
            padding: 40px 0;
        }
    `
    return (
        <PageWrapper>
            <PageContainer className='datenschutz white'>
                <Container>
                    <Typography variant='h2' componente='h1' gutterBottom={true}>Datenschutz</Typography>
                    <Typography paragraph={true}>
                        Wir informieren Sie nachfolgend gemäß den gesetzlichen Vorgaben des Datenschutzrechts (insb. gemäß BDSG n.F. und der europäischen Datenschutz-Grundverordnung ‚DS-GVO‘) über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten durch unser Unternehmen. Diese Datenschutzerklärung gilt auch für unsere Websites und Sozial-Media-Profile. Bezüglich der Definition von Begriffen wie etwa „personenbezogene Daten“ oder „Verarbeitung“ verweisen wir auf Art. 4 DS-GVO.
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Name und Kontaktdaten des / der Verantwortlichen</strong><br />
                        Unser/e Verantwortliche/r (nachfolgend „Verantwortlicher“) i.S.d. Art. 4 Zif. 7 DS-GVO ist:<br /><br />
                        1. Snookerclub Neubrandenburg e.V.<br />
                        Nonnenhofer Straße 60<br />
                        17033, Neubrandenburg<br />
                        E-Mail-Adresse: snookertempel@gmail.com
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Datenschutzbeauftragte/r</strong><br />
                        Marian Dubowski<br />
                        Robinienstraße 2<br />
                        17033 Neubrandenburg<br />
                        marian.dubowski84@gmail.com
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Datenarten, Zwecke der Verarbeitung und Kategorien betroffener Personen</strong>
                    </Typography>
                    <Typography paragraph={true}>
                        Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Erhebung, Verarbeitung und Nutzung personenbezogener Daten.
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>1. Arten der Daten, die wir verarbeiten</strong><br />Bestandsdaten (Name, Adresse etc.), Kontaktdaten (Telefonnummer, E-Mail, Fax etc.), Zahlungsdaten (Bankdaten, Kontodaten, Zahlungshistorie etc.),
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>2. Zwecke der Verarbeitung nach Art. 13 Abs. 1 c) DS-GVO</strong><br />Erfüllung vertraglicher Verpflichtungen, Nutzererfahrung verbessern, Kundenservice und Kundenpflege, Websites mit Funktionen und Inhalten bereitstellen,
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>3. Kategorien der betroffenen Personen nach Art. 13 Abs. 1 e) DS-GVO</strong><br />Besucher/Nutzer der Website,
                    </Typography>
                    <Typography paragraph={true}>Die betroffenen Personen werden zusammenfassend als „Nutzer“ bezeichnet.</Typography>
                    <Typography paragraph={true}>
                        <strong>Rechtsgrundlagen der Verarbeitung personenbezogener Daten</strong><br />
                        Nachfolgend Informieren wir Sie über die Rechtsgrundlagen der Verarbeitung personenbezogener Daten:</Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wenn wir Ihre Einwilligung für die Verarbeitung personenbezogenen Daten eingeholt haben, ist Art. 6 Abs. 1 S. 1 lit. a) DS-GVO Rechtsgrundlage.</li>
                            <li>Ist die Verarbeitung zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Ihre Anfrage hin erfolgen, so ist Art. 6 Abs. 1 S. 1 lit. b) DS-GVO Rechtsgrundlage.</li>
                            <li>Ist die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der wir unterliegen (z.B. gesetzliche Aufbewahrungspflichten), so ist Art. 6 Abs. 1 S. 1 lit. c) DS-GVO Rechtsgrundlage.</li>
                            <li>Ist die Verarbeitung erforderlich, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen, so ist Art. 6 Abs. 1 S. 1 lit. d) DS-GVO Rechtsgrundlage.</li>
                            <li>Ist die Verarbeitung zur Wahrung unserer oder der berechtigten Interessen eines Dritten erforderlich und überwiegen diesbezüglich Ihre Interessen oder Grundrechte und Grundfreiheiten nicht, so ist Art. 6 Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage.</li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Weitergabe personenbezogener Daten an Dritte und Auftragsverarbeiter</strong><br />
                        Ohne Ihre Einwilligung geben wir grundsätzlich keine Daten an Dritte weiter. Sollte dies doch der Fall sein, dann erfolgt die Weitergabe auf der Grundlage der zuvor genannten Rechtsgrundlagen z.B. bei der Weitergabe von Daten an Online-Paymentanbieter zur Vertragserfüllung oder aufgrund gerichtlicher Anordnung oder wegen einer gesetzlichen Verpflichtung zur Herausgabe der Daten zum Zwecke der Strafverfolgung, zur Gefahrenabwehr oder zur Durchsetzung der Rechte am geistigen Eigentum.<br />
                        Wir setzen zudem Auftragsverarbeiter (externe Dienstleister z.B. zum Webhosting unserer Websites und Datenbanken) zur Verarbeitung Ihrer Daten ein. Wenn im Rahmen einer Vereinbarung zur Auftragsverarbeitung an die Auftragsverarbeiter Daten weitergegeben werden, erfolgt dies immer nach Art. 28 DS-GVO. Wir wählen dabei unsere Auftragsverarbeiter sorgfältig aus, kontrollieren diese regelmäßig und haben uns ein Weisungsrecht hinsichtlich der Daten einräumen lassen. Zudem müssen die Auftragsverarbeiter geeignete technische und organisatorische Maßnahmen getroffen haben und die Datenschutzvorschriften gem. BDSG n.F. und DS-GVO einhalten
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Datenübermittlung in Drittstaaten</strong><br />
                        Durch die Verabschiedung der europäischen Datenschutz-Grundverordnung (DS-GVO) wurde eine einheitliche Grundlage für den Datenschutz in Europa geschaffen. Ihre Daten werden daher vorwiegend durch Unternehmen verarbeitet, für die DS-GVO Anwendung findet. Sollte doch die Verarbeitung durch Dienste Dritter außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums stattfinden, so müssen diese die besonderen Voraussetzungen der Art. 44 ff. DS-GVO erfüllen. Das bedeutet, die Verarbeitung erfolgt aufgrund besonderer Garantien, wie etwa die von der EU-Kommission offiziell anerkannte Feststellung eines der EU entsprechenden Datenschutzniveaus oder der Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen, der so genannten „Standardvertragsklauseln“. Bei US-Unternehmen erfüllt die Unterwerfung unter das sog. „Privacy-Shield“, dem Datenschutzabkommen zwischen der EU und den USA, diese Voraussetzungen.
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Löschung von Daten und Speicherdauer</strong><br />
                        Sofern nicht in dieser Datenschutzerklärung ausdrücklich angegeben, werden Ihre personenbezogen Daten gelöscht oder gesperrt, sobald der Zweck für die Speicherung entfällt, es sei denn deren weitere Aufbewahrung ist zu Beweiszwecken erforderlich oder dem stehen gesetzliche Aufbewahrungspflichten entgegenstehen. Darunter fallen etwa handelsrechtliche Aufbewahrungspflichten von Geschäftsbriefen nach § 257 Abs. 1 HGB (6 Jahre) sowie steuerrechtliche Aufbewahrungspflichten nach § 147 Abs. 1 AO von Belegen (10 Jahre). Wenn die vorgeschriebene Aufbewahrungsfrist abläuft, erfolgt eine Sperrung oder Löschung Ihrer Daten, es sei denn die Speicherung ist weiterhin für einen Vertragsabschluss oder zur Vertragserfüllung erforderlich.
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Bestehen einer automatisierten Entscheidungsfindung</strong><br />
                        Wir setzen keine automatische Entscheidungsfindung oder ein Profiling ein.
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Bereitstellung unserer Website und Erstellung von Logfiles</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wenn Sie unsere Webseite lediglich informatorisch nutzen (also keine Registrierung und auch keine anderweitige Übermittlung von Informationen), erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten:
                                <ul>
                                    <li>IP-Adresse</li>
                                    <li>Internet-Service-Provider des Nutzers</li>
                                    <li>Datum und Uhrzeit des Abrufs</li>
                                    <li>Browsertyp</li>
                                    <li>Sprache und Browser-Version</li>
                                    <li>Inhalt des Abrufs</li>
                                    <li>Zeitzone</li>
                                    <li>Zugriffsstatus/HTTP-Statuscode</li>
                                    <li>Datenmenge</li>
                                    <li>Websites, von denen die Anforderung kommt</li>
                                    <li>Betriebssystem</li>
                                </ul>
                                Eine Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten von Ihnen findet nicht statt.<br /><br />
                            </li>
                            <li>Diese Daten dienen dem Zweck der nutzerfreundlichen, funktionsfähigen und sicheren Auslieferung unserer Website an Sie mit Funktionen und Inhalten sowie deren Optimierung und statistischen Auswertung.<br /><br /></li>
                            <li>Rechtsgrundlage hierfür ist unser in den obigen Zwecken auch liegendes berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 S.1 lit. f)  DS-GVO.<br /><br /></li>
                            <li>Wir speichern aus Sicherheitsgründen diese Daten in Server-Logfiles für die Speicherdauer von  Tagen. Nach Ablauf dieser Frist werden diese automatisch gelöscht, es sei denn wir benötigen deren Aufbewahrung zu Beweiszwecken bei Angriffen auf die Serverinfrastruktur oder anderen Rechtsverletzungen.<br /></li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Cookies</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wir verwenden sog. Cookies bei Ihrem Besuch unserer Website. Cookies sind kleine Textdateien, die Ihr Internet-Browser auf Ihrem Rechner ablegt und speichert. Wenn Sie unsere Website erneut aufrufen, geben diese Cookies Informationen ab, um Sie automatisch wiederzuerkennen. Die so erlangten Informationen dienen dem Zweck, unsere Webangebote technisch und wirtschaftlich zu optimieren und Ihnen einen leichteren und sicheren Zugang auf unsere Website zu ermöglichen. Wir informieren Sie dazu beim Aufruf unserer Website mittels eines Hinweises auf unsere Datenschutzerklärung über die Verwendung von Cookies zu den zuvor genannten Zwecken und wie Sie dieser widersprechen bzw. deren Speicherung verhindern können („Opt-out“). Unsere Website nutzt Session-Cookies, persistente Cookies und Cookies von Drittanbietern:<br /><br />
                                <ul>
                                    <li><strong>Session-Cookies:</strong><br />Wir verwenden sog. Cookies zum Wiedererkennen mehrfacher Nutzung eines Angebots durch denselben Nutzer (z.B. wenn Sie sich eingeloggt haben zur Feststellung Ihres Login-Status). Wenn Sie unsere Seite erneut aufrufen, geben diese Cookies Informationen ab, um Sie automatisch wiederzuerkennen. Die so erlangten Informationen dienen dazu, unsere Angebote zu optimieren und Ihnen einen leichteren Zugang auf unsere Seite zu ermöglichen. Wenn Sie den Browser schließen oder Sie sich ausloggen, werden die Session-Cookies gelöscht.</li><br />
                                    <li><strong>Persistente Cookies:</strong><br />Diese werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. In den Sicherheitseinstellungen Ihres Browsers können Sie die Cookies jederzeit löschen.</li><br />
                                    <li><strong>Cookies von Drittanbietern (Third-Party-Cookies):</strong><br />Entsprechend Ihren Wünschen können Sie können Ihre Browser-Einstellung konfigurieren und z. B. Die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie jedoch an dieser Stelle darauf hin, dass Sie dann eventuell nicht alle Funktionen dieser Website nutzen können. Lesen Sie Näheres zu diesen Cookies bei den jeweiligen Datenschutzerklärungen zu den Drittanbietern.</li><br />

                                </ul>
                            </li>
                            <li>Rechtsgrundlage dieser Verarbeitung ist Art. 6 Abs. 1 S. lit. b) DS-GVO, wenn die Cookies zur Vertragsanbahnung z.B. bei Bestellungen gesetzt werden und ansonsten haben wir ein berechtigtes Interesse an der effektiven Funktionalität der Website, so dass in dem Falle Art. 6 Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage ist.<br /><br /></li>
                            <li><strong>Widerspruch und „Opt-Out“:</strong><br />
                                Das Speichern von Cookies auf Ihrer Festplatte können Sie allgemein verhindern, indem Sie in Ihren Browser-Einstellungen „keine Cookies akzeptieren“ wählen. Dies kann aber eine Funktionseinschränkung unserer Angebote zur Folge haben. Sie können dem Einsatz von Cookies von Drittanbietern zu Werbezwecken über ein sog. „Opt-out“ über diese amerikanische Website (<Link href="https://optout.aboutads.info" rel="nofollow noopener noreferrer" target="_blank">https://optout.aboutads.info</Link>) oder diese europäische Website (<Link href="http://www.youronlinechoices.com/de/praferenzmanagement/" rel="nofollow noopener noreferrer" target="_blank">http://www.youronlinechoices.com/de/praferenzmanagement/</Link>) widersprechen.
                            </li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Abwicklung von Verträgen</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wir verarbeiten Bestandsdaten (z.B. Unternehmen, Titel/akademischer Grad, Namen und Adressen sowie Kontaktdaten von Nutzern, E-Mail), Vertragsdaten (z.B. in Anspruch genommene Leistungen, Namen von Kontaktpersonen) und Zahlungsdaten (z.B. Bankverbindung, Zahlungshistorie) zwecks Erfüllung unserer vertraglichen Verpflichtungen (Kenntnis, wer Vertragspartner ist; Begründung, inhaltliche Ausgestaltung und Abwicklung des Vertrags; Überprüfung auf Plausibilität der Daten) und Serviceleistungen (z.B. Kontaktaufnahme des Kundenservice) gem. Art. 6 Abs. 1 S. 1 lit b) DS-GVO. Die in Onlineformularen als verpflichtend gekennzeichneten Eingaben, sind für den Vertragsschluss erforderlich.<br /><br /></li>
                            <li>Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, außer sie ist zur Verfolgung unserer Ansprüche (z.B. Übergabe an Rechtsanwalt zum Inkasso) oder zur Erfüllung des Vertrags (z.B. Übergabe der Daten an Zahlungsanbieter) erforderlich oder es besteht hierzu besteht eine gesetzliche Verpflichtung gem. Art. 6 Abs. 1 S. 1 lit. c) DS-GVO.<br /><br /></li>
                            <li>Wir können die von Ihnen angegebenen Daten zudem verarbeiten, um Sie über weitere interessante Produkte aus unserem Portfolio zu informieren oder Ihnen E-Mails mit technischen Informationen zukommen lassen.<br /><br /></li>
                            <li>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Dies ist für die Bestands- und Vertragsdaten dann der Fall, wenn die Daten für die Durchführung des Vertrages nicht mehr erforderlich sind und keine Ansprüche mehr aus dem Vertrag geltend gemacht werden können, weil diese verjährt sind (Gewährleistung: zwei Jahre / Regelverjährung: drei Jahre). Wir sind aufgrund handels- und steuerrechtlicher Vorgaben verpflichtet, Ihre Adress-, Zahlungs- und Bestelldaten für die Dauer von zehn Jahren zu speichern. Allerdings nehmen wir bei Vertragsbeendigung nach drei Jahren eine Einschränkung der Verarbeitung vor, d. h. Ihre Daten werden nur zur Einhaltung der gesetzlichen Verpflichtungen eingesetzt. Angaben im Nutzerkonto verbleiben bis zu dessen Löschung.<br /><br /></li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Kontaktaufnahme per Kontaktformular / E-Mail / Fax / Post</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Bei der Kontaktaufnahme mit uns per Kontaktformular, Fax, Post oder E-Mail werden Ihre Angaben zum Zwecke der Abwicklung der Kontaktanfrage verarbeitet.<br /><br /></li>
                            <li>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung von Ihnen Art. 6 Abs. 1 S. 1 lit. a) DS-GVO. Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer Kontaktanfrage oder E-Mail, eines Briefes oder Faxes übermittelt werden, ist Art. 6 Abs. 1 S. 1 lit. f) DS-GVO. Der Verantwortliche hat ein berechtigtes Interesse an der Verarbeitung und Speicherung der Daten, um Anfragen der Nutzer beantworten zu können, zur Beweissicherung aus Haftungsgründen und um ggf. seiner gesetzlichen Aufbewahrungspflichten bei Geschäftsbriefen nachkommen zu können. Zielt der Kontakt auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 S. 1 lit. b) DS-GVO.<br /><br /></li>
                            <li>Wir können Ihre Angaben und Kontaktanfrage in unserem Customer-Relationship-Management System ("CRM System") oder einem vergleichbaren System speichern.<br /><br /></li>
                            <li>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Für die personenbezogenen Daten aus der Eingabemaske des Kontaktformulars und diejenigen, die per E-Mail übersandt wurden, ist dies dann der Fall, wenn die jeweilige Konversation mit Ihnen beendet ist. Beendet ist die Konversation dann, wenn sich aus den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist. Anfragen von Nutzern, die über einen Account bzw. Vertrag mit uns verfügen, speichern wir bis zum Ablauf von zwei Jahren nach Vertragsbeendigung. Im Fall von gesetzlichen Archivierungspflichten erfolgt die Löschung nach deren Ablauf: Ende handelsrechtlicher (6 Jahre) und steuerrechtlicher (10 Jahre) Aufbewahrungspflicht.<br /><br /></li>
                            <li>Sie haben jederzeit die Möglichkeit, die Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a) DS-GVO zur Verarbeitung der personenbezogenen Daten zu widerrufen. Nehmen Sie per E-Mail Kontakt mit uns auf, so können Sie der Speicherung der personenbezogenen Daten jederzeit widersprechen.<br /><br /></li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Google Analytics</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wir haben das Webseitenanalyse-Tool „Google Analytics“ (Google Ireland Limited, Registernr.: 368047, Gordon House, Barrow Street, Dublin 4, Irland) auf unserer Website integriert.<br /><br /></li>
                            <li>Beim Besuch unserer Website setzt Google einen Cookie auf Ihren Computer, um die Benutzung unserer Website durch Sie analysieren zu können. Die gewonnenen Daten werden in die USA übertragen und dort gespeichert. Falls personenbezogen Daten in die USA übertragen werden sollten, bietet die Zertifizierung Googles gemäß Privacy-Shield-Abkommen (<Link href="https://www.privacyshield.gov/EU-US-Framework" rel="nofollow noopener noreferrer" target="_blank">https://www.privacyshield.gov/EU-US-Framework</Link>) die Garantie dafür, dass das europäische Datenschutzrecht eingehalten wird.<br /><br /></li>
                            <li>Wir haben die IP-Anonymisierung „anonymizeIP“ aktiviert, wodurch die IP-Adressen nur gekürzt weiterverarbeitet werden. Auf dieser Webseite wird Ihre IP-Adresse von Google daher innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Webseite wird Google diese Informationen benutzen, um Ihre Nutzung der Webseite auszuwerten, um Reports über die Webseitenaktivitäten zusammenzustellen und um weitere, mit der Websitenutzung und der Internetnutzung verbundene, Dienstleistungen gegenüber dem Verantwortlichen zu erbringen. Wir haben darüber hinaus die geräteübergreifende Analyse von Website-Besuchern aktiviert, die über eine sog. User-ID durchgeführt wird. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Die Nutzung von Google Analytics dient dem Zweck der Analyse, Optimierung und Verbesserung unserer Website.<br /><br /></li>
                            <li>Rechtsgrundlage hierfür ist unser in den obigen Zwecken auch liegendes berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 S.1 lit. f)  DS-GVO.<br /><br /></li>
                            <li>Die von uns gesendeten und mit Cookies, Nutzerkennungen (z. B. User-ID) oder Werbe-IDs verknüpften Daten werden nach 18 Monate Monaten automatisch gelöscht. Die Löschung von Daten, deren Aufbewahrungsdauer erreicht ist, erfolgt automatisch einmal im Monat.<br /><br /></li>
                            <li>Weitere Informationen zu Datennutzung bei Google Analytics finden Sie hier: <Link href="https://www.google.com/analytics/terms/de.html" rel="nofollow noopener noreferrer" target="_blank">https://www.google.com/analytics/terms/de.html</Link> (Nutzungsbedingungen von Analytics), <Link href="https://support.google.com/analytics/answer/6004245?hl=de" rel="nofollow noopener noreferrer" target="_blank">https://support.google.com/analytics/answer/6004245?hl=de</Link> (Hinweise zum Datenschutz bei Analytics) und Googles Datenschutzerklärung <Link href="https://policies.google.com/privacy" rel="nofollow noopener noreferrer" target="_blank">https://policies.google.com/privacy</Link>.<br /><br /></li>
                            <li>Widerspruch und „Opt-Out“: Das Speichern von Cookies auf Ihrer Festplatte können Sie allgemein verhindern, indem Sie in Ihren Browser-Einstellungen „keine Cookies akzeptieren“ wählen. Dies kann aber eine Funktionseinschränkung unserer Angebote zur Folge haben. Sie können darüber hinaus die Erfassung der, durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen, Daten an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <Link href="http://tools.google.com/dlpage/gaoptout?hl=de" rel="nofollow noopener noreferrer" target="_blank">http://tools.google.com/dlpage/gaoptout?hl=de</Link><br /><br /></li>
                            <li>Die geräteübergreifende Nutzeranalyse können Sie in Ihrem Google-Account unter „Meine Daten {'>'} persönliche Daten“ deaktivieren.<br /><br /></li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Google Maps</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wir haben auf unserer Website Karten von „Google Maps“ (Google Ireland Limited, Registernr.: 368047, Gordon House, Barrow Street, Dublin 4, Irland) integriert. Damit können wirden Standort von Adressen und eine Anfahrtsbeschreibung direkt auf unserer Website in interaktiven Karten anzeigen und Ihnen die Nutzung dieses Tools ermöglichen.<br /><br /></li>
                            <li>Bei dem Abruf unserer Website, wo Google Maps integriert ist, wird eine Verbindung zu den Servern von Google in den USA aufgebaut. Hierbei können Ihre IP und Standort an Google übertragen werden. Zudem erhält Google die Information, dass Sie die entsprechende Seite aufgerufen haben. Dies erfolgt auch ohne Nutzerkonto bei Google. Sollten Sie in Ihren Google-Account eingeloggt sein, kann Google die obigen Daten Ihrem Account zuordnen. Wenn Sie dies nicht wünschen, müssen Sie sich bei Ihrem Google-Account ausloggen. Google erstellt aus solchen Daten Nutzerprofile und nutzt diese Daten zum Zwecke der Werbung, Marktforschung oder Optimierung seiner Websites.<br /><br /></li>
                            <li>Rechtsgrundlage hierfür ist unser in den obigen Zwecken auch liegendes berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 S.1 lit. f)  DS-GVO.<br /><br /></li>
                            <li>Sie haben gegenüber Google ein Widerspruchsrecht gegen die Bildung von Nutzerprofilen. Bitte richten Sie sich deswegen direkt an Google über die unten genannte Datenschutzerklärung. Ein Opt-Out-Widerspruch hinsichtlich der Werbe-Cookies können Sie hier in Ihrem Google-Account vornehmen:<br /><Link href="https://adssettings.google.com/authenticated" rel="nofollow noopener noreferrer" target="_blank">https://adssettings.google.com/authenticated</Link>.<br /><br /></li>
                            <li>In den Nutzungsbedingungen von Google Maps unter <Link href="https://www.google.com/intl/de_de/help/terms_maps.html" rel="nofollow noopener noreferrer" target="_blank">https://www.google.com/intl/de_de/help/terms_maps.html</Link> und in der Datenschutzerklärung für Werbung von Google unter <Link href="https://policies.google.com/technologies/ads" rel="nofollow noopener noreferrer" target="_blank">https://policies.google.com/technologies/ads</Link> finden Sie weitere Informationen zur Verwendung von Google Cookies und deren Werbetechnologien, Speicherdauer, Anonymisierung, Standortdaten, Funktionsweise und Ihre Rechte. Allgemeine Datenschutzerklärung von Google: <Link href="https://policies.google.com/privacy" rel="nofollow noopener noreferrer" target="_blank">https://policies.google.com/privacy</Link>.<br /><br /></li>
                            <li>Google ist nach dem EU-US Privacy Shield zertifiziert (<Link href="https://www.privacyshield.gov/EU-US-Framework" rel="nofollow noopener noreferrer" target="_blank">https://www.privacyshield.gov/EU-US-Framework</Link>) und daher verpflichtet europäisches Datenschutzrecht einzuhalten.<br /><br /></li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Präsenz in sozialen Medien</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li>Wir unterhalten in sozialen Medien Profile bzw. Fanpages, um mit den dort angeschlossenen und registrierten Nutzern zu kommunizieren und um über unsere Produkte, Angebote und Dienstleistungen zu informieren. Die US-Anbieter sind nach dem sog. Privacy-Shield zertifiziert und damit verpflichtet europäischen Datenschutz einzuhalten. Bei der Nutzung und dem Aufruf unseres Profils im jeweiligen Netzwerk durch Sie gelten die jeweiligen Datenschutzhinweise und Nutzungsbedingungen des jeweiligen Netzwerks.<br /><br /></li>
                            <li>Wir verarbeiten Ihre Daten, die Sie uns über diese Netzwerke senden, um mit Ihnen zu kommunizieren und um Ihre dortigen Nachrichten zu beantworten.<br /><br /></li>
                            <li>Die Rechtsgrundlage für die Verarbeitung der personenbezogenen Daten ist unser berechtigtes Interesse an der Kommunikation mit den Nutzern und unsere Außendarstellung zwecks Werbung gemäß Art. 6 Abs. 1 S. 1 lit. f) DS-GVO. Soweit Sie dem Verantwortlichen des sozialen Netzwerks eine Einwilligung in die Verarbeitung Ihrer personenbezogenen Daten erteilt haben, ist Rechtsgrundlage Art. 6 Abs. 1 S. 1 lit. a) und Art. 7 DS-GVO.<br /><br /></li>
                            <li>Die Datenschutzhinweise, Auskunftsmöglichkeiten und Widerspruchmöglichkeiten (Opt-Out) der jeweiligen Netzwerke finden Sie hier:
                                <ul>
                                    <li>
                                        <strong>Facebook</strong> (Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland):<br />Datenschutzerklärung: <Link href="https://www.facebook.com/about/privacy/" rel="nofollow noopener noreferrer" target="_blank">https://www.facebook.com/about/privacy/</Link>,<br />
                                        Opt-Out: <Link href="https://www.facebook.com/settings?tab=ads" rel="nofollow noopener noreferrer" target="_blank">https://www.facebook.com/settings?tab=ads</Link> und <Link href="http://www.youronlinechoices.com" rel="nofollow noopener noreferrer" target="_blank">http://www.youronlinechoices.com</Link>,<br />
                                        Privacy Shield: <Link href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active" rel="nofollow noopener noreferrer" target="_blank">https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active</Link>.
                                    </li>
                                </ul>
                            </li>
                        </ol></Typography>
                    <Typography paragraph={true}>
                        <strong>Rechte der betroffenen Person</strong>
                    </Typography>
                    <Typography>
                        <ol style={{ margin: "10px 0px", padding: "15px" }}>
                            <li><strong>Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten<br /><br />
                                Soweit die Verarbeitung auf Ihrer Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a), Art. 7 DS-GVO beruht, haben Sie das Recht, die Einwilligung jederzeit zu widerrufen. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt.<br /><br />
                                Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung gemäß Art. 6 Abs. 1 S. 1 lit. f) DS-GVO stützen, können Sie Widerspruch gegen die Verarbeitung einlegen. Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der nachfolgenden Beschreibung der Funktionen dargestellt wird. Bei Ausübung eines solchen Widerspruchs bitten wir um Darlegung der Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns durchgeführt verarbeiten sollten. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung fortführen.<br /><br />
                                Sie können der Verarbeitung Ihrer personenbezogenen Daten für Zwecke der Werbung und Datenanalyse jederzeit widersprechen. Das Widerspruchsrecht können Sie kostenfrei ausüben. Über Ihren Werbewiderspruch können Sie uns unter folgenden Kontaktdaten informieren:<br /><br />1. Snookerclub Neubrandenburg e.V.<br />Nonnenhofer Straße 60<br />17033, Neubrandenburg<br />E-Mail-Adresse: snookertempel@gmail.com<br /></strong>
                                <br /></li>
                            <li><strong>Recht auf Auskunft</strong><br />
                                Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen, ob Sie betreffende personenbezogene Daten verarbeitet werden. Sofern dies der Fall ist, haben Sie ein Recht auf Auskunft über Ihre bei uns gespeicherten persönlichen Daten nach Art. 15 DS-GVO. Dies beinhaltet insbesondere die Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, die Herkunft ihrer Daten, sofern diese nicht direkt bei Ihnen erhoben wurden.<br /><br /></li>
                            <li><strong>Recht auf Berichtigung</strong><br />
                                Sie haben ein Recht auf Berichtigung unrichtiger oder auf Vervollständigung richtiger Daten nach Art. 16 DS-GVO.
                                <br /><br />
                            </li>
                            <li><strong>Recht auf Löschung</strong><br />
                                Sie haben ein Recht auf Löschung Ihrer bei uns gespeicherten Daten nach Art. 17 DS-GVO, es sei denn gesetzliche oder vertraglichen Aufbewahrungsfristen oder andere gesetzliche Pflichten bzw. Rechte zur weiteren Speicherung stehen dieser entgegen.
                                <br /><br />
                            </li>
                            <li><strong>Recht auf Einschränkung</strong><br />
                                Sie haben das Recht, eine Einschränkung bei der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn eine der Voraussetzungen in Art. 18 Abs. 1 lit. a) bis d) DS-GVO erfüllt ist:<br />
                                <ul>
                                    <li>
                                        Wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für eine Dauer bestreiten, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen;
                                    </li>
                                    <li>
                                        die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnen und stattdessen die Einschränkung der Nutzung der personenbezogenen Daten verlangen;
                                    </li>
                                    <li>
                                        der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder
                                    </li>
                                    <li>
                                        wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DS-GVO eingelegt haben und noch nicht feststeht, ob die berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.
                                    </li>
                                </ul>
                            </li><br />
                            <li><strong>Recht auf Datenübertragbarkeit</strong><br />
                                Sie haben ein Recht auf Datenübertragbarkeit nach Art. 20 DS-GVO, was bedeutet, dass Sie die bei uns über Sie gespeicherten personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten können oder die Übermittlung an einen anderen Verantwortlichen verlangen können.
                                <br /><br />
                            </li>
                            <li><strong>Recht auf Beschwerde</strong><br />
                                Sie haben ein Recht auf Beschwerde bei einer Aufsichtsbehörde. In der Regel können Sie sich hierfür an die Aufsichtsbehörde insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes wenden.
                                <br /><br />
                            </li>
                        </ol>
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Datensicherheit</strong><br />
                        Um alle personenbezogen Daten, die an uns übermittelt werden, zu schützen und um sicherzustellen, dass die Datenschutzvorschriften von uns, aber auch unseren externen Dienstleistern eingehalten werden, haben wir geeignete technische und organisatorische Sicherheitsmaßnahmen getroffen. Deshalb werden unter anderem alle Daten zwischen Ihrem Browser und unserem Server über eine sichere SSL-Verbindung verschlüsselt übertragen.
                    </Typography>
                    <Typography paragraph={true}>
                        <strong>Stand: 23.02.2019</strong><br />Quelle: <Link href="https://www.juraforum.de/impressum-generator/">Muster-Datenschutzerklärung von JuraForum.de</Link>
                    </Typography>
                </Container>
            </PageContainer>
        </PageWrapper>
    )
}
