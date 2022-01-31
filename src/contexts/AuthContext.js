import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    updateProfile,
    updatePhoneNumber,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
import app from "../firebase";
import axios from 'axios';
import Loading from '../components/modules/Loading';

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const auth = getAuth(app)
    const db = getFirestore(app)

    const getUserDataById = useCallback((uid) => {
        const docRef = doc(db, 'users', uid)
        return getDoc(docRef)
    }, [db])

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserEmail = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const updateUserPassword = (password) => {
        return updatePassword(currentUser, password)
    }

    const createUser = (user) => {
        return axios.post('https://europe-west1-snookerclub-nb.cloudfunctions.net/createUser', {
            ...user
        })
    }

    const updateUserProfile = (updateData, user = currentUser) => {
        return updateProfile(user, updateData)
    }

    const updateUserPhoneNumber = (phoneNumber, user = currentUser) => {
        return updatePhoneNumber(user, phoneNumber)
    }

    const updateUserData = (updateData, uid = currentUser.uid) => {
        return setDoc(doc(db, 'users', uid), {
            ...updateData
        }, { merge: true }).then(() => {
            return setCurrentUser(prevUser => {
                prevUser.additionalData = updateData
                return prevUser
            })
        })
    }

    const checkSignInLink = (link) => {
        return isSignInWithEmailLink(auth, link)
    }

    const signInWithLink = (email, link) => {
        return signInWithEmailLink(auth, email, link)
    }

    console.log(currentUser)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            if (user) {
                const tokenResult = await user.getIdTokenResult()
                setIsAdmin(tokenResult.claims.admin === true)
                const snapshot = await getUserDataById(user.uid)
                if (snapshot.exists()) {
                    // console.log(snapshot.data())
                    const additionalUserData = snapshot.data()
                    setCurrentUser(prevUser => {
                        // console.log(prevUser)
                        prevUser.additionalData = additionalUserData
                        return prevUser
                    })
                }
            }
            setLoading(false)
        })
        return unsubscribe
    }, [auth, getUserDataById])


    const value = {
        currentUser,
        isAdmin,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        createUser,
        updateUserProfile,
        updateUserData,
        checkSignInLink,
        signInWithLink,
        getUserDataById,
        updateUserPhoneNumber
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <Loading />}
        </AuthContext.Provider>
    )
}
