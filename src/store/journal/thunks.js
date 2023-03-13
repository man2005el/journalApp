import { useSelector } from "react-redux"
import { doc, setDoc, collection } from "firebase/firestore/lite";
import { FirebaseStore } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {
    return async(dispatch, getState) =>{

        dispatch(savingNewNote())

        const { uid } = getState().auth;
        

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime() ,
        }

        const newDoc = doc( collection( FirebaseStore, `${uid}/journal/notes` ) );
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        

    }   
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth;

        if (!uid) throw new Error("El uid no exite")

        const resp = await loadNotes(uid)

        dispatch(setNotes(resp))

    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving())

        const {uid} = getState().auth
        const {active} = getState().journal

        const noteToFirestore = {...active}
        delete noteToFirestore.id

        const docRef = doc(FirebaseStore, `${uid}/journal/notes/${ active.id }`)
        await setDoc(docRef, noteToFirestore, {merge: true})

        dispatch(updateNote(active))

    }
}