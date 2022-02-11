import React, { createContext, useContext, useState, useEffect } from 'react'
import Loading from '../components/modules/Loading'
import { useAuth } from './AuthContext';
import {
    doc,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    collection,
    getDocs
} from 'firebase/firestore'
import { db } from "../firebase";

import config from '../util/config';
const { axios } = config

const AdminContext = createContext()

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState({})
    const [memberships, setMemberships] = useState({});
    const [allRents, setAllRents] = useState([])
    const { isAdmin, currentUser, getUserDataById, getUserMembershipsById } = useAuth()
    const headers = {}

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
        setLoading(true)
        let fetchedUsers = []
        const allUsers = {}
        const allMemberships = {}
        return axios.post('/admin-getAllUsers', null, {
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
            setLoading(false)
        })
    }

    const getAllRents = () => {
        return getDocs(collection(db, 'rents')).then((querySnapshot) => {
            const allRents = []
            querySnapshot.forEach((doc) => {
                allRents.push({ id: doc.id, ...doc.data() })
            })
            setAllRents(allRents)
        }).catch((error) => console.error('Error fetching all rents', error))
    }

    useEffect(() => {
        if (currentUser && isAdmin) {
            headers.Authorization = 'Bearer ' + currentUser.accessToken
            return getAllUsers()
        }
    }, []); // eslint-disable-line

    const value = {
        users,
        memberships,
        allRents,
        setUsers,
        setMemberships,
        getAllUsers,
        setLoading,
        saveNewMembership,
        updateMembership,
        deleteMembership,
        getAllRents
    }

    return (
        <AdminContext.Provider value={value}>
            {!loading ? children : <Loading />}
        </AdminContext.Provider>
    )
}