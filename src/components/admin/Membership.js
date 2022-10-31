import { DatePicker } from '@mui/lab';
import { Button, CardActions, CardContent, CardHeader, Container, FormControl, InputAdornment, InputLabel, Link, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import PageWrapper from '../layout/PageWrapper';
import FormCard from '../modules/FormCard';
import config from "../../util/config";
import { setDate } from "../../util/helpers";
import _ from 'lodash'

const Membership = () => {
    const { userId, membershipId } = useParams()
    const navigate = useNavigate()
    const { users, memberships, saveNewMembership, updateMembership } = useAdmin()
    console.log(users, memberships)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [type, setType] = useState('Vollmitglied');
    const [subheader, setSubheader] = useState('');
    const { membershipFees } = config

    const goback = () => navigate(-1);

    const handleSelectChange = (e) => {
        setType(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!membershipId) {
                await saveNewMembership(userId, {
                    fee: membershipFees[type],
                    type,
                    start: startDate
                })

            } else {
                await updateMembership(userId, membershipId, {
                    fee: membershipFees[type],
                    type,
                    start: startDate,
                    end: endDate
                })
            }
            goback()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!_.isEmpty(users) && userId) {
            let str = users[userId].email
            if (users[userId].displayName) str += ' - ' + users[userId].displayName
            setSubheader(str)
        }
    }, [userId, users]);

    useEffect(() => {
        if (membershipId && userId && !_.isEmpty(memberships) && memberships[userId][membershipId].start) {
            setStartDate(setDate(memberships[userId][membershipId].start.seconds, true))
            setType(memberships[userId][membershipId].type)
        }
    }, [membershipId, userId, memberships]);

    useEffect(() => {
        if (membershipId && userId && !_.isEmpty(memberships) && memberships[userId][membershipId].end) {
            setEndDate(setDate(memberships[userId][membershipId].end.seconds, true))
        }
    }, [membershipId, userId, memberships]);

    return <PageWrapper backgroundColor={true}>
        <FormCard onSubmit={handleSubmit}>
            <CardHeader
                title={membershipId
                    ? 'Mitgliedschaft bearbeiten'
                    : 'Neue Mitgliedschaft anlegen'}
                subheader={subheader}
            />
            <CardContent>
                <Container disableGutters style={{
                    display: 'grid',
                    gridAutoRows: '1fr',
                    gridGap: '1em 0'
                }}>
                    <FormControl variant="standard">
                        <InputLabel>Typ</InputLabel>
                        <Select
                            value={type}
                            onChange={handleSelectChange}
                            label="Typ"
                            required
                            inputProps={{ name: 'type' }}
                        >
                            <MenuItem value="">
                                <em>Bitte auswählen</em>
                            </MenuItem>
                            <MenuItem value='Vollmitglied'>Vollmitglied</MenuItem>
                            <MenuItem value='Vollmitglied_alt'>Vollmitglied alt</MenuItem>
                            <MenuItem value='Vollmitglied_65'>Vollmitglied 65</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label='Beitrag'
                        name='membershipFee'
                        disabled
                        variant='standard'
                        defaultValue={type ? membershipFees[type] : null}
                        InputProps={{ endAdornment: <InputAdornment position='end'>€</InputAdornment> }}
                    />
                    <DatePicker
                        label='Startdatum'
                        value={startDate}
                        onChange={(newDate) => {
                            setStartDate(newDate)
                        }}
                        renderInput={
                            (params) => <TextField
                                variant='standard'
                                name='startDate'
                                {...params} />
                        }
                    />
                    {membershipId && <DatePicker
                        label='Enddatum'
                        value={endDate}
                        onChange={(newDate) => {
                            setEndDate(newDate)
                        }}
                        renderInput={
                            (params) => <TextField
                                name='endDate'
                                variant='standard'
                                {...params} />
                        }
                    />}
                </Container>
                <CardActions style={{ justifyContent: 'space-between', marginTop: '1em' }}>
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

export default Membership;
