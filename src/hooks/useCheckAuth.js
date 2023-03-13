import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from '@firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { logout, login } from '../store/auth/authSlice'
import { startLoadingNotes } from '../store/journal'

export const useCheckAuth = () => {
    const {status} = useSelector (state => state.auth);
    
    const dispatch = useDispatch();

        useEffect(() => {
        
        onAuthStateChanged(FirebaseAuth, async (user) =>{

            if (!user) return dispatch( logout() );

            const { uid, photoURL, displayName, email } = user;
            dispatch(login({uid, photoURL, displayName, email}));
            dispatch(startLoadingNotes());

        })

    }, []);

    return {status}
}
