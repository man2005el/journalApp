import { Drawer, Box, Typography, Toolbar, List, Divider} from "@mui/material"
import { useSelector } from "react-redux"
import { SidebarItem } from "./SidebarItem"


export const Sidebar = ({drawerWidth = 240}) => {

    const {displayName} = useSelector(state => state.auth)
    const {notes} = useSelector(state => state.journal)

    return (
        
        <Box
            className="animate__animated animate__fadeInLeft"
            component='nav'
            sx={{width: {sm: drawerWidth }, flexShrink: {sm: 0}} }
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display:{xs:'block'},
                    '& .MuiDrawer-paper':{boxSizing:'border-box', width: drawerWidth}
                }}
            >

                <Toolbar>
                <Typography variant='h6' noWrap component='div'>{(displayName) ?`${displayName}` :`Bienvenido`}</Typography>
                </Toolbar>
                <Divider/>

                <List>
                    {notes.map(note => <SidebarItem key={note.id} {...note} />)}
                </List>

            </Drawer>
        </Box>
    )
}
