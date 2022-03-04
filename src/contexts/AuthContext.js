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
    verifyPasswordResetCode,
    confirmPasswordReset
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    getDocs,
    collection
} from 'firebase/firestore'
import app from "../firebase";
import Loading from '../components/modules/Loading';

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentMemberships, setCurrentMemberships] = useState({});
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [headers, setHeaders] = useState()
    const auth = getAuth(app)
    const db = getFirestore(app)

    const getUserDataById = useCallback((uid) => {
        const docRef = doc(db, 'users', uid)
        return getDoc(docRef).then((snap => {
            const additionalData = {
                id: snap.id,
                ...snap.data()
            }
            return additionalData
        }))
    }, [db])

    const getUserMembershipsById = useCallback((uid) => {
        const collectionRef = collection(db, 'users', uid, 'memberships')

        return getDocs(collectionRef).then(snapshot => {
            const memberships = {}
            snapshot.forEach(d => {
                memberships['uid'] = uid
                memberships[d.id] = { ...d.data() }
                return memberships
            })
            return memberships
        })
    }, [db])

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        const actionCodeSettings = {
            url: window.location.origin + '/dashboard',
        }
        return sendPasswordResetEmail(auth, email, actionCodeSettings)
    }

    const verifyPasswordReset = (code) => {
        return verifyPasswordResetCode(auth, code)
    }

    const confirmPassword = (code, password) => {
        return confirmPasswordReset(auth, code, password)
    }

    const updateUserEmail = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const updateUserPassword = (password) => {
        return updatePassword(currentUser, password)
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

    // console.log(currentUser, currentMemberships)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            if (user) {
                const tokenResult = await user.getIdTokenResult()
                setIsAdmin(tokenResult.claims.admin === true)
                setHeaders({ Authorization: 'Bearer ' + user.accessToken })
                const data = await getUserDataById(user.uid)
                if (data) {
                    setCurrentUser(prevUser => {
                        // console.log(prevUser)
                        prevUser.additionalData = data
                        return prevUser
                    })
                }
                const memberships = await getUserMembershipsById(user.uid)
                delete memberships.uid
                setCurrentMemberships(memberships)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [auth, getUserDataById, getUserMembershipsById])


    const value = {
        currentUser,
        currentMemberships,
        isAdmin,
        headers,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        updateUserProfile,
        updateUserData,
        checkSignInLink,
        signInWithLink,
        getUserDataById,
        updateUserPhoneNumber,
        getUserMembershipsById,
        verifyPasswordReset,
        confirmPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <Loading />}
        </AuthContext.Provider>
    )
}
