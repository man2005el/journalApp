import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import {FirebaseAuth} from './config'


const googleProvider = new GoogleAuthProvider();

export const signInGoogle = async() => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider )
        //const credential = GoogleAuthProvider.credentialFromResult(result)
        const {displayName, email, uid, photoURL} = result.user
       
        
        return {
            ok: true,
            //User Info
            displayName, email, uid, photoURL
        }

    } 
    catch (error){

        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage,
        }

    }

}

export const registerUserWithEmailPassword = async({displayName, email, password, photoURL}) => {
    
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName, errorMessage } = resp.user
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        } )

        return {
            ok: true,
            uid, photoURL, email, displayName, errorMessage
        }
        
    } catch (error) {
        console.log(error)
        return{ok:false, errorMessage: error.message}
    }
}

export const loginUserWithEmailPassword = async({email, password}) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName} = resp.user
        console.log(resp)
        return {ok: true, 
                uid, photoURL, displayName}

    } 
    
    catch (error) {
        console.log(error)
        return {ok: false, errorMessage: error.message}
    }


}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}