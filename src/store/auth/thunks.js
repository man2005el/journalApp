import { useDispatch } from "react-redux"
import { checkingCredentials, logout, login } from "./authSlice"
import { signInGoogle, registerUserWithEmailPassword, loginUserWithEmailPassword, logoutFirebase } from "../../firebase/provider"

export const checkingAuth = (email, password) => {
    
    
    return async (dispatch) => {

        dispatch(checkingCredentials())

    }

}

export const startGoogleSignIn = (email, password) => {
    
    
    return async (dispatch) => {

        dispatch(checkingCredentials())
        
       const result = await signInGoogle()
       if(!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))

    }

}

export const startCreatingUserWithEmailPassword = ({displayName, email, password}) => {
    return async( dispatch ) =>{

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({displayName, email, password})

        if (!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, email, displayName, photoURL}))

    }

    
}

export const startLoginWithEmailAndPassword = ({email, password}) => {
    return async(dispatch) => {
        
        dispatch(checkingCredentials())

        const {ok, uid, photoURL, displayName, errorMessage } = await loginUserWithEmailPassword({email, password})

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, email, displayName, photoURL}))

    }
}

export const startLogoutFirebase = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(logout())
    }
}