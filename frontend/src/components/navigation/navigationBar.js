import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const handleLogout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("userId")
}

const NavigationBar = () => {
    const location = useLocation();
    console.log("LOCATION:", location.pathname)
    const token = window.localStorage.getItem("token");
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Road Trip Planner
                    </Typography>
                    <div>
                        {token ? (
                            <>
                                <CustomNavLink to="/planner">Planner</CustomNavLink>
                                <CustomNavLink to="/trips">My Trips</CustomNavLink>
                                <Link to='/login' onClick={handleLogout} className="nav-link">
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <CustomNavLink to="/login">Login</CustomNavLink>
                                <CustomNavLink to="/signup">Sign Up</CustomNavLink>
                            </>
                        )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

const CustomNavLink = ({ to, children }) => {
    return (
        <Button component={NavLink} to={to} activeClassName="active" color="inherit">
            {children}
        </Button>
    );
};

export default NavigationBar;
