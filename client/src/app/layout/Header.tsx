import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyles = {
    textDecoration: 'none',
    color: 'inherit',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header() {
    return (
        <AppBar sx={{ marginBottom: 4 }} position="static">
            <Toolbar
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <Typography
                    variant="h5"
                    component={NavLink}
                    to='/'
                    sx={navStyles} >
                    RE-STORE
                </Typography>
                
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({title, path}, index) => (
                        <ListItem
                            key={index}
                            component={NavLink}
                            to={path}
                            sx={navStyles} >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton edge='start' color="inherit" size="large" sx={{ marginRight: 2 }}>
                        <Badge badgeContent='4' color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({title, path}, index) => (
                            <ListItem
                                key={index}
                                component={NavLink}
                                to={path}
                                sx={navStyles} >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* <NavLink to='/'>test</NavLink> */}
            </Toolbar>
        </AppBar>
    )
}
