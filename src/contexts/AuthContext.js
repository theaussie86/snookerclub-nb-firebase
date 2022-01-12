import { createContext, useContext, useState, useEffect } from 'react'
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
} from 'firebase/auth'
import app from "../firebase";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const auth = getAuth(app)

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
        return updatePassword(auth.currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            if (user) {
                const tokenResult = await user.getIdTokenResult()
                setIsAdmin(tokenResult.claims.admin === true)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [auth])


    const value = {
        currentUser,
        isAdmin,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
