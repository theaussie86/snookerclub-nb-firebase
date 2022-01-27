import React, { useContext } from 'react';
import { createContext, useState } from 'react';
import Loading from '../components/modules/Loading';
import {
    doc,
    collection,
    addDoc,
    getDoc,
    setDoc
} from 'firebase/firestore'
import { db } from '../firebase'

const DataContext = createContext()

export const useData = () => useContext(DataContext)

const DataProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const saveNewBreak = (breakObject) => {
        return addDoc(collection(db, 'breaks'), breakObject)
    }

    const value = { saveNewBreak }

    return <DataContext.Provider value={value}>
        {!loading ? children : <Loading />}
    </DataContext.Provider>;
};

export default DataProvider