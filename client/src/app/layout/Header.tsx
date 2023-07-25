import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import agent from "../agent";
import { IBasket, IBasketItem } from "../models/basket";

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

    const [basketCount, setBasketCount] = useState<number>(0);

    useEffect(() => {
        agent.Basket.getBasket()
            .then((basket: IBasket) => {
                let quantity = 0;
                for(const item of basket.basketItems) {
                    quantity += item.quantity;
                }
                setBasketCount(quantity);
            })
            .catch();

    }, []);

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
                    <IconButton component={Link} to='basket' edge='start' color="inherit" size="large" sx={{ marginRight: 2 }}>
                        <Badge badgeContent={basketCount} color="secondary">
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
            </Toolbar>
        </AppBar>
    )
}
