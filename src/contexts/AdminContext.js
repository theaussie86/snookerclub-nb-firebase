import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useAuth } from './AuthContext';
import {
    doc,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    collection,
    getDocs,
    collectionGroup
} from 'firebase/firestore'
import { db } from "../firebase";
import _ from 'lodash'
import config from '../util/config';
const { axios } = config

const AdminContext = createContext()

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {
    const [users, setUsers] = useState({})
    const [memberships, setMemberships] = useState({});
    const [allRents, setAllRents] = useState([])
    const { isAdmin, headers, currentUser, getUserDataById, getUserMembershipsById } = useAuth()

    const createBills = () => {
        return axios.post('/https-createBills', null, { headers: headers })
    }

    const saveNewMembership = (uid, data) => {
        return addDoc(collection(db, 'users', uid, 'memberships'), data).then(docRef => getDoc(docRef)).then(snapshot => {
            console.log(snapshot.id, snapshot.data())
            setMemberships(prev => {
                prev[uid][snapshot.id] = snapshot.data()
                return prev
            })
        })
    }

    const updateMembership = (uid, mid, data) => {
        return setDoc(doc(db, 'users', uid, 'memberships', mid), data).then((snapshot) => {
            setMemberships(prev => {
                prev[uid][mid] = data
                return prev
            })
        })
    }

    const deleteMembership = (uid, mid) => {
        return deleteDoc(doc(db, 'users', uid, 'memberships', mid)).then(() => {
            setMemberships(prev => {
                delete prev[uid][mid]
                return prev
            })
        })
    }

    const getAllUsers = () => {
        let fetchedUsers = []
        const allUsers = {}
        const allMemberships = {}
        return axios.post('/https-getAllUsers', null, {
            headers: headers
        }).then(res => {
            const promises = []
            fetchedUsers = res.data
            for (let user of fetchedUsers) {
                promises.push(getUserDataById(user.uid))
                promises.push(getUserMembershipsById(user.uid))
            }
            return Promise.all(promises)
        }).then(results => {
            for (let data of results) {
                if (!data.id && data.uid) {
                    allMemberships[data.uid] = data
                    delete allMemberships[data.uid].uid
                    continue
                }
                for (let u of fetchedUsers) {
                    if (u.uid === data.id) {
                        u.additionalData = data
                        allUsers[u.uid] = u;
                    }
                }
            }
            setMemberships(allMemberships)
            setUsers(allUsers)
        })
    }

    const createUser = (user) => {
        return axios.post('/https-createUser', {
            ...user
        }, { headers: headers })
    }

    const setAsAdmin = (uid) => {
        return axios.post('/https-setAsAdmin', {
            uid
        }, { headers: headers })
    }

    const deleteAdminRights = (uid) => {
        return axios.post('/https-deleteAdminRights', {
            uid
        }, { headers: headers })
    }

    const getAllRents = () => {
        return getDocs(collectionGroup(db, 'rents')).then((querySnapshot) => {
            const allRents = []
            querySnapshot.forEach((doc) => {
                allRents.push({
                    id: doc.id,
                    path: doc.ref.path,
                    ...doc.data()
                })
            })
            setAllRents(allRents)
        }).catch((error) => console.error('Error fetching all rents', error))
    }

    const deleteRent = async (path) => {
        const segments = path.split('/')
        const id = segments[segments.length - 1]
        return deleteDoc(doc(db, path)).then(() => {
            setAllRents(prevRents => prevRents.filter(r => r.id !== id))
        })
    }

    useEffect(() => {
        if (currentUser && isAdmin && !_.isEmpty(headers)) {
            return getAllUsers()
        }
    }, []);//eslint-disable-line

    const value = {
        users,
        memberships,
        allRents,
        setUsers,
        setMemberships,
        getAllUsers,
        saveNewMembership,
        updateMembership,
        deleteMembership,
        getAllRents,
        deleteRent,
        createUser,
        setAsAdmin,
        deleteAdminRights,
        createBills
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}