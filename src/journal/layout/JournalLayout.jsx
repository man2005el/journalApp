import { Box, Toolbar } from "@mui/material"
import {Navbar,Sidebar} from "../components"



export const JournalLayout = ({children}) => {

    const drawerWidth = 240;

    return (
        <Box sx={{display: 'flex'}}>
            
            <Navbar drawerWidth={drawerWidth}/>

            <Sidebar drawerWidth={drawerWidth}/>

            <Box 
                component='main'
                sx={{flexGrow: 1, p: 5}}
            >

            <Toolbar/>

            {children}


            </Box>
        </Box>
    )
}
