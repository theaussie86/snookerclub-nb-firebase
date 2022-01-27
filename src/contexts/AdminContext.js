import React, { createContext, useContext, useState, useEffect } from 'react'
import Loading from '../components/modules/Loading'
import { useAuth } from './AuthContext';
import {
    doc,
    getDoc,
    setDoc,
    connectFirestoreEmulator
} from 'firebase/firestore'
import { db } from "../firebase";

import config from '../util/config';
const { axios } = config

const AdminContext = createContext()

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState(() => [])
    const { currentUser, getUserDataById } = useAuth()
    const headers = { Authorization: 'Bearer ' + currentUser.accessToken }

    console.log(users)

    const getAllUsers = () => {
        setLoading(true)
        let fetchedUsers = []
        return axios.post('/admin-getAllUsers', null, {
            headers: headers
        }).then(res => {
            const promises = []
            fetchedUsers = res.data
            for (let user of fetchedUsers) {
                promises.push(getUserDataById(user.uid))
            }
            return Promise.all(promises)
        }).then(results => {
            for (let res of results) {
                console.log(res.data(), res.id)
                for (let u of fetchedUsers) {
                    if (u.uid === res.id) {
                        u.additionalData = res.data()
                    }
                }
            }
            setUsers(fetchedUsers)
            setLoading(false)
        })
    }

    useEffect(() => {
        return getAllUsers()
    }, []);

    const value = {
        users,
        setUsers,
        getAllUsers,
        setLoading
    }

    return (
        <AdminContext.Provider value={value}>
            {!loading ? children : <Loading />}
        </AdminContext.Provider>
    )
}