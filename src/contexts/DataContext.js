import React, { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import Loading from '../components/modules/Loading';
import {
    doc,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    where
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext';

const DataContext = createContext()

export const useData = () => useContext(DataContext)

const DataProvider = ({ children }) => {

    const [loading, setLoading] = useState(true); // eslint-disable-line
    const [breaks, setBreaks] = useState([]);
    const { currentUser } = useAuth()
    const [myRents, setMyRents] = useState([])

    const saveNewBreak = (breakObject) => {
        return addDoc(collection(db, 'breaks'), breakObject).then(docRef => {
            console.log(docRef.id)
            setBreaks(prevBreaks => {
                prevBreaks.push({
                    ...breakObject,
                    id: docRef.id
                })
                return prevBreaks
            })
        })
    }

    const saveNewRent = (rent) => {
        return addDoc(collection(db, 'rents'), rent)
    }

    const deleteBreak = (id) => {
        return deleteDoc(doc(db, 'breaks', id)).then(() => {
            setBreaks(prevBreaks => prevBreaks.filter(br => br.id !== id))
        })
    }

    const getAllBreaks = () => {
        return getDocs(collection(db, 'breaks')).then((snapshot) => {
            const allBreaks = []
            snapshot.forEach((doc) => {
                let data = doc.data()
                allBreaks.push({ ...data, id: doc.id })
            })
            setBreaks(allBreaks)
        }).catch(err => console.error('error fetching allbreaks', err))
    }

    const getRentsByUserId = (uid) => {
        const rentsRef = collection(db, 'rents')
        const q = query(rentsRef, where('_member', '==', uid))
        return getDocs(q).then((querySnapshot) => {
            const myRents = []
            querySnapshot.forEach((doc) => {
                myRents.push({ id: doc.id, ...doc.data() })
            })
            setMyRents(myRents)
        }).catch((error) => console.error('error fetching rents', error))
    }

    const deleteRent = (id) => {
        return deleteDoc(doc(db, 'rents', id)).then(() => {
            setMyRents(prevRents => prevRents.filter(r => r.id !== id))
        })
    }

    useEffect(() => {
        let subscribed = true
        if (currentUser && subscribed)
            return getAllBreaks().then(() => setLoading(false))
        return () => subscribed = false
    }, []); // eslint-disable-line


    const value = {
        saveNewBreak,
        saveNewRent,
        breaks,
        myRents,
        deleteBreak,
        getRentsByUserId,
        deleteRent
    }

    return <DataContext.Provider value={value}>
        {!loading ? children : <Loading />}
    </DataContext.Provider>;
};

export default DataProvider