import { Link as RouterLink } from 'react-router-dom'
import {Grid, Typography, TextField, Button, Link, Alert} from "@mui/material";
import {Google} from '@mui/icons-material';
import { Authlayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuth, startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

const formData = {

    email:"",
    password:"",
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth)

    const dispatch = useDispatch()

    const { email, password, onInputChange,formState } =useForm(formData)

    const isAuthenticating = useMemo(() => status === "checking", [status])
    
    const onSubmit = () => {
        event.preventDefault()
        dispatch(startLoginWithEmailAndPassword(formState))
    }

    const onGoogleSubmit = () => {
        dispatch(startGoogleSignIn())
    }

    return (
       
        <Authlayout title="Login">

                <form onSubmit={onSubmit}>

                    <Grid container>
                        <Grid item xs={12} sx={{mb:1}}>
                            <TextField 
                            label='Correo' 
                            name="email"  
                            type="email" 
                            placeholder="correo@google.com" 
                            fullWidth 
                            onChange={onInputChange}
                            value={email}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{mb:2}}>
                            <TextField 
                            label='Contraseña' 
                            name="password" 
                            type="password" 
                            placeholder="" 
                            fullWidth 
                            onChange={onInputChange}
                            value={password}
                            />
                        </Grid>

                        <Grid container spacing={2} sx={{mb:2}}>

                            <Grid item xs={12} display={(!!errorMessage) ? "" : "none"}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" type="submit" disabled={isAuthenticating} fullWidth>Login</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" onClick={onGoogleSubmit} disabled={isAuthenticating} fullWidth> 
                                <Google/>
                                <Typography sx={{ml:1}}> Google </Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Link color="primary" component={RouterLink} to="/auth/register"> Crear Nueva Cuenta </Link>
                        </Grid>

                    </Grid>

                </form>
        </Authlayout>
    )
}
