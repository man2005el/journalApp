import { Link as RouterLink } from 'react-router-dom'
import { Authlayout } from "../layout/AuthLayout"
import { Grid, Link, Typography, TextField, Button, Alert } from "@mui/material"
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
    displayName:"",
    email:"",
    password:"",

}

const formValidations = {
    displayName:[(value) => value.length >=1 , "El nombre es obligario."],
    email:[(value) => value.includes("@"), "El correo debe tener un @"],
    password:[(value) => value.length >= 6, "La contraseña debe poseer minimo 6 caracteres."],
}

export const SignUpPage = () => {

    const dispatch = useDispatch()

    const [formSubmitted, setFormSubmitted] = useState(false);

    const  {status, errorMessage} = useSelector(state => state.auth);

    const isCheckingAuthentication = useMemo(() => status === "checking", [status])

    const { displayName, email, password, onInputChange, formState,
            isFormValid, displayNameValid, emailValid, passwordValid } =useForm(formData, formValidations)


    const onSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)

        if( !isFormValid ) return;

        dispatch(startCreatingUserWithEmailPassword(formState))    

        console.log(formState) 
    }

       

    return (
        <Authlayout title="Registro">

        {/*<h1>FormValid</h1>*/}

            <form onSubmit={onSubmit}>

                <Grid container>

                    <Grid item xs={12} sx={{mb:1}}>
                        <TextField  
                            label='Nombre' 
                            name="displayName" 
                            onChange={onInputChange} 
                            value={displayName} 
                            error={!!displayNameValid} 
                            helperText={displayNameValid} 
                            type="text" 
                            placeholder="Nombre Completo" 
                            fullWidth/>
                    </Grid>

                    
                    <Grid item xs={12} sx={{mb:1}}>
                        <TextField 
                            label='Correo' 
                            name="email" 
                            onChange={onInputChange} 
                            value={email}
                            error={!!emailValid} 
                            helperText={emailValid}   
                            type="email" 
                            placeholder="correo@google.com" 
                            fullWidth/>
                    </Grid>

                    <Grid item xs={12} sx={{mb:2}}>
                        <TextField 
                            label='Contraseña' 
                            name="password" 
                            onChange={onInputChange} 
                            value={password}
                            error={!!passwordValid} 
                            helperText={passwordValid}  
                            type="password" 
                            placeholder="" 
                            fullWidth/>
                    </Grid>

                    <Grid container spacing={2} sx={{mb:2}}>

                        <Grid item xs={12} display={(!!errorMessage) ? "" : "none"}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <Button disabled={isCheckingAuthentication} variant="contained" type="submit" fullWidth>Crear cuenta</Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{mr:1}}> Ya tienes una cuenta? </Typography>
                        <Link color="primary" component={RouterLink} to="/auth/login">Inicia sesión.</Link>
                    </Grid>

                </Grid>

            </form> 
        
        </Authlayout>    
    )
}
