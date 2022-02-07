import React, { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import Loading from '../components/modules/Loading';
import {
    doc,
    collection,
    addDoc,
    getDocs,
    deleteDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext';

const DataContext = createContext()

export const useData = () => useContext(DataContext)

const DataProvider = ({ children }) => {

    const [loading, setLoading] = useState(false); // eslint-disable-line
    const [breaks, setBreaks] = useState([]);
    const { currentUser } = useAuth()

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

    useEffect(() => {
        if (currentUser)
            return getAllBreaks()
    }, [currentUser]);


    const value = {
        saveNewBreak,
        breaks,
        deleteBreak
    }

    return <DataContext.Provider value={value}>
        {!loading ? children : <Loading />}
    </DataContext.Provider>;
};

export default DataProvider