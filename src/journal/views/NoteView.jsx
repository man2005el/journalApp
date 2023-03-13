import { Typography, Grid, Button, TextField } from "@mui/material"
import { SaveOutlined } from "@mui/icons-material"
import { ImageGallery } from "../components/ImageGallery"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { useSelector, useDispatch } from "react-redux"
import { useMemo, useEffect } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startSaveNote } from "../../store/journal/thunks"


export const NoteView = () => {

    const dispatch = useDispatch();
    const {active, isSaving, messageSaved} = useSelector(state => state.journal)
    
    const { body, title, onInputChange, formState, date } = useForm(active);

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString();
    },[date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {

        if(messageSaved.length > 0) {
        Swal.fire("Nota Actualizada", messageSaved, 'success')
        }

    }, [messageSaved])
    
    const onSaveNote = () => {
        dispatch(startSaveNote())
    } 

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}>

            <Grid item>
    <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            
            <Grid item>
                <Button onClick={() => onSaveNote()} disabled={isSaving}>
                    <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField sx={{border:'none', mb:1}}
                    type='text'
                    fullWidth
                    variant="filled"
                    placeholder="Ingresa un título"
                    label="Título"
                    name="title"
                    value={title}
                    onChange={onInputChange}                    
                />
                <TextField sx={{border:'none', mb:1}}
                    type='text'
                    fullWidth
                    multiline
                    variant="filled"
                    placeholder="¿Qué sucedió hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}                    
                />
            </Grid>

            <ImageGallery/>

        </Grid>
    )
}
