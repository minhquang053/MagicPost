import React from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    List,
    ListItem,
    Typography, 
    styled,
    ListItemButton,
    ListItemText,
    Button
} from '@mui/material';
// menu
import DrawerItem from './DrawerItem';
// rote
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//img
import logo from "../assets/logo.svg"

// personalize
const StyledToolbar = styled(Toolbar) ({
    display: 'flex',
    justifyContent: 'space-between',
});

const ListMenu = styled(List)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up("sm")] : {
        display: "flex",
    },
}));

//rotas
const itemList = [
    {
      text: "Home",
      to: "/" 
    },
    {
      text: "About",
      to: "/about"
    },
    {
        text: "Contact",
        to: "/contact"
    }
];

const Navbar = () => {
    const navigate = useNavigate();
    const handleSubmit = async(event) => {
    //navigate(itemList[0].to);
    try {
        if (event) {
            event.preventDefault();
        }
        navigate(itemList[0].to);
    } catch(error) {
        console.error('Error back to Home Page:', error);
    }
    }

    return (
        <AppBar 
        component="nav" 
        position="sticky"
        sx={{ 
            backgroundColor: 'orange', 
        }}
        elevation={0}
        >
            <StyledToolbar>
                <ListMenu>
                  
                        <img
                        src={logo}
                        alt="logo"
                        style={{ 
                        width: "10%", 
                        marginRight: 10,
                        marginBottom: -20,
                        }}
                        />
                    
                    
                    
                        <Button
                onClick={handleSubmit}
                variant="h6"
                component="h2"

                >
                    Magic Post
                </Button>
                    
                    
                </ListMenu>
                
                <Box sx={{display: { xs: 'block', sm: 'none' } }}>
                    <DrawerItem /> 
                </Box> 
                <ListMenu>
                    {itemList.map( ( item ) => {
                        const { text } = item;
                        return(
                            <ListItem key={text}>
                                <ListItemButton component={Link} to={item.to}
                                sx={{
                                    color: '#fff',
                                    "&:hover": {
                                        backgroundColor: 'transparent',
                                        color: '#1e2a5a',
                                    }
                                }}
                                >
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </ListMenu>
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar;
