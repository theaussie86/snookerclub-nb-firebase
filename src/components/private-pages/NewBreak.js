import { Alert, Button, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, Link, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import FormCard from '../modules/FormCard';
import DatePicker from "@mui/lab/DatePicker";
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';


const NewBreak = () => {
    const [error, setError] = useState('');
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [playedNotSelf, setPlayedNotSelf] = useState(false);
    const [player, setPlayer] = useState(currentUser.displayName);
    const playerInput = useRef();
    const { saveNewBreak } = useData()

    const goback = () => navigate(-1);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { numBreak } = e.target.elements

        try {

            const breakObject = { player, datum: date, 'break': parseInt(numBreak.value) }
            if (!playedNotSelf) breakObject._member = currentUser.uid
            await saveNewBreak(breakObject)
            navigate(-1)

        } catch (error) {

            console.log(error)
            setError('Fehler beim Speichern des Breaks', error.toString())
        }
    }

    const handleCheckboxChange = (e) => {
        setPlayedNotSelf(e.target.checked)
        if (!e.target.checked) setPlayer(currentUser.displayName)
    }

    const handlePlayerChange = (e) => {
        setPlayer(e.target.value)
    }

    useEffect(() => {
        playerInput.current.focus()
    }, [player])

    return <PageWrapper backgroundColor={true}>
        <FormCard onSubmit={handleSubmit}>
            <CardHeader title="Break eintragen" />
            <CardContent>
                <Container>
                    {error && <Alert severity='error'>{error}</Alert>}
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
                        renderInput={(params) => <TextField variant='standard' {...params} />}
                    />
                    <TextField
                        id='player'
                        label='Spielername'
                        variant='standard'
                        margin='normal'
                        color='primary'
                        name='player'
                        inputRef={playerInput}
                        value={player}
                        onChange={handlePlayerChange}
                        disabled={!playedNotSelf}
                    />
                    <FormControlLabel
                        label='Ich habe das Break nicht selbst gespielt'
                        control={<Checkbox id='notSelf' name='notSelf' checked={playedNotSelf} onChange={handleCheckboxChange} color='primary' />}
                    />
                    <TextField
                        id='numBreak'
                        label='Höhe des Breaks'
                        variant='standard'
                        type='number'
                        required
                        inputProps={{ min: 0, max: 155 }}
                        margin='normal'
                        color='primary'
                        name='numBreak'
                        style={{ marginTop: 0 }}
                    />
                </Container>
                <CardActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Speichern
                    </Button>
                    <Link onClick={goback}>Zurück</Link>
                </CardActions>
            </CardContent>
        </FormCard>
    </PageWrapper>;
};

export default NewBreak;
