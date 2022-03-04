import { Alert, Button, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, Link, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import FormCard from '../modules/FormCard';
import FormCardContent from '../modules/FormCardContent';
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { calcRentAsCents, formatDuration, formatMoney } from '../../util/helpers';
import moment from 'moment';


const NewRent = () => {
    const [error, setError] = useState('');
    const [date, setDate] = useState(new Date());
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    let prevView = null
    const [duration, setDuration] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [onlyGuests, setOnlyGuests] = useState(false);
    const [player1, setPlayer1] = useState(currentUser.displayName);
    const [player2, setPlayer2] = useState('');
    const { saveNewRent } = useData()

    const goback = () => navigate(-1);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const rentObject = {
                player1,
                player2,
                datum: date,
                start,
                end,
                onlyGuests,
                _member: currentUser.uid
            }
            await saveNewRent(rentObject)
            navigate(-1)

        } catch (error) {

            console.log(error)
            setError('Fehler beim Speichern des Breaks', error.toString())
        }
    }

    const handleCheckboxChange = (e) => {
        setOnlyGuests(e.target.checked)
        if (!e.target.checked) setPlayer1(currentUser.displayName)
        else {
            setPlayer1('')
        }
    }

    const handleTimeChange = (time, type) => {
        switch (type) {
            case 'start':
                if (prevView === 'minutes')
                    setStart(time)
                break;
            case 'end':
                if (prevView === 'minutes') {
                    if (time < start) time.setDate(start.getDate() + 1)
                    else if (moment.duration(time - start).get('days') > 0)
                        time.setDate(start.getDate())
                    setEnd(time)
                }
                break;
            default:
                break;
        }
    }

    const handleInputChange = (e) => {
        if (e.target.name === 'player1') setPlayer1(e.target.value)
        if (e.target.name === 'player2') setPlayer2(e.target.value)
        if (e.target.name === 'start') setStart(moment(e.target.value, 'HH:mm').toDate())
        if (e.target.name === 'end') setEnd(moment(e.target.value, 'HH:mm').toDate())
    }

    useEffect(() => {
        if (start && end) {
            setDuration(formatDuration(end - start))
            setPrice(calcRentAsCents((end - start), onlyGuests))
        }
    }, [start, end, onlyGuests])

    return <PageWrapper backgroundColor={true}>
        <FormCard onSubmit={handleSubmit}>
            <CardHeader title="Gast abrechnen" />
            <FormCardContent>
                <Container disableGutters style={{ marginBottom: '1rem' }}>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {(duration && price) && <Alert severity='info'>{`Ihr habt ${duration} für ${formatMoney(price / 100, 2)} gespielt`}</Alert>}
                </Container>
                <Container disableGutters style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <DatePicker
                        disableFuture
                        label="Datum"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField variant='standard' required {...params} />}
                    />
                    <FormControlLabel
                        label='Es haben nur Gäste miteinander gespielt'
                        disableTypography={true}
                        style={{ fontSize: '.875rem', marginTop: '1rem' }}
                        control={<Checkbox id='notSelf' name='notSelf' checked={onlyGuests} onChange={handleCheckboxChange} color='primary' />}
                    />
                    <TextField
                        id='player1'
                        label='Name von Spieler 1'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        name='player1'
                        defaultValue={player1}
                        disabled={!onlyGuests}
                        required={onlyGuests}
                        onBlur={handleInputChange}
                    />
                    <TextField
                        id='player2'
                        label='Name von Spieler 2'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        name='player2'
                        defaultValue={player2}
                        onBlur={handleInputChange}
                        required
                    // inputProps={{ tabIndex: 1 }}
                    />
                    <TimePicker
                        label="Startzeit"
                        value={start}
                        onChange={(newValue) => handleTimeChange(newValue, 'start')}
                        getClockLabelText={(view) => prevView = view}
                        // inputProps={{ tabIndex: 1 }}
                        renderInput={(params) => <TextField
                            required
                            name='start'
                            variant='standard'
                            onBlur={handleInputChange}
                            style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
                            {...params}
                        />}
                    />
                    <TimePicker
                        label="Endzeit"
                        value={end}
                        onChange={(newValue) => handleTimeChange(newValue, 'end')}
                        getClockLabelText={(view) => prevView = view}
                        // inputProps={{ tabIndex: 1 }}
                        renderInput={(params) => <TextField
                            required
                            name='end'
                            variant='standard'
                            onBlur={handleInputChange}
                            style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
                            {...params}
                        />}
                    />
                </Container>
                <CardActions style={{ justifyContent: 'space-between', padding: '1rem' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Speichern
                    </Button>
                    <Link onClick={goback}>Zurück</Link>
                </CardActions>
            </FormCardContent>
        </FormCard>
    </PageWrapper>;
};

export default NewRent;
