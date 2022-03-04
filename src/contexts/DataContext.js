import React, { useContext } from 'react';
import { createContext, useState } from 'react';
import {
    doc,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    where,
    collectionGroup,
    updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import config from '../util/config';
import { useAuth } from './AuthContext';
import { getBillDate, getBillDateEnd, getBillDateStart } from '../util/helpers';
const { axios } = config

const DataContext = createContext()

export const useData = () => useContext(DataContext)

const DataProvider = ({ children }) => {

    const [breaks, setBreaks] = useState([]);
    const [myRents, setMyRents] = useState([])
    const [myBills, setMyBills] = useState([])
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

    const saveNewRent = (rent) => {
        const bills = query(collection(db, 'users', currentUser.uid, 'bills'), where('billDate', '>=', getBillDateStart(rent.datum)), where('billDate', '<=', getBillDateEnd(rent.datum)))
        let parentBill
        return getDocs(bills)
            .then((snapShot) => {

                if (snapShot.empty) return addDoc(collection(db, 'users', currentUser.uid, 'bills'), {
                    _member: currentUser.uid,
                    billDate: getBillDate(rent.datum)
                })

                if (snapShot.size > 1) throw new Error(snapShot.size + ' bills found. Only one needed')

                return snapShot.docs[0].ref
            })
            .then(doc => {
                parentBill = doc
                return addDoc(collection(db, 'users', currentUser.uid, 'bills', doc.id, 'rents'), rent)
            })
            .then(() => updateDoc(parentBill, { id: parentBill.id }))
            .catch(error => console.error(error))
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

    const getRentsByUserId = (uid = currentUser.uid) => {
        const rentsRef = collectionGroup(db, 'rents')
        const q = query(rentsRef, where('_member', '==', uid))
        return getDocs(q).then((querySnapshot) => {
            const myRents = []
            querySnapshot.forEach((doc) => {
                myRents.push({ id: doc.id, ...doc.data() })
            })
            setMyRents(myRents)
        }).catch((error) => console.error('error fetching rents', error))
    }

    const getBillsByUserId = (uid = currentUser.uid) => {
        const billsRef = collectionGroup(db, 'bills')
        const q = query(billsRef, where('_member', '==', uid))
        return getDocs(q).then((snapshot) => {
            const bills = []
            snapshot.forEach(doc => {
                bills.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setMyBills(bills)
        })
    }

    const getBillFromLink = (url, content, iv, tag) => {
        return axios.post(url, { content, iv, tag })
    }

    const value = {
        saveNewBreak,
        saveNewRent,
        breaks,
        myRents,
        myBills,
        deleteBreak,
        getRentsByUserId,
        getAllBreaks,
        getBillsByUserId,
        getBillFromLink
    }

    return <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>;
};

export default DataProvider