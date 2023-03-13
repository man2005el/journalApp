import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ( {title, body, id, date} ) => {
    
    const dispatch = useDispatch()

    const activeNote = {    
        id,
        title,
        body,
        date,
        image:[],          
    }
    
    const onActiveNote = () => {
        dispatch(setActiveNote(activeNote))
    }
    
    const newTitle = useMemo(() => {
        return title.length > 17
        ? title.substring(0,17) + "..."
        : title;
    }, [title])

    return (
            
            <ListItem disablePadding>
                <ListItemButton onClick={() => onActiveNote()}>
                    <ListItemIcon>
                         <TurnedInNot/>
                    </ListItemIcon>
                    <Grid container>
                        <ListItemText primary={newTitle}/>
                        <ListItemText secondary={body}/>
                    </Grid>
                </ListItemButton>
            </ListItem>
    )
        
}
