import { CircularProgress, Grid, Typography } from "@mui/material"


export const CheckingAuth = () => {
    return (
    
    <Grid 
        container 
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
        <Grid 
            container
            direction="row"
            justifyContent="center"  
        >
            <CircularProgress color="warning"/>
            <Grid sx={{mr:2}}>
                <Typography color="white">Loading...</Typography>
            </Grid>
        </Grid>

    </Grid> 
    )
}
