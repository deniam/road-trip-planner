import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const handleLogout = (navigate) => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("userId")
    navigate('/login');
}

const NavigationBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignUp = location.pathname === "/signup"
    const isLogin = location.pathname === "/login"

    const token = window.localStorage.getItem("token");
    const isLoggedIn = !!token;
    
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: 'monospace',  fontWeight: 700}}>
                        Road Trip Planner
                    </Typography>
                    <div>             
                    {isLoggedIn ? (
                        <>
                        <CustomNavLink to="/planner" data-testid="planner">Planner</CustomNavLink>
                        <CustomNavLink to="/trips" data-testid="trips">My Trips</CustomNavLink>
                        <Button color="inherit" data-testid="logout" onClick={() => handleLogout(navigate)}>
                            Logout
                        </Button>
                        </>
                    ) : (isLogin ? (
                        <>
                        <CustomNavLink to="/signup" data-testid="signup">Sign Up</CustomNavLink>
                        </>
                    ) : (
                        <>
                        <CustomNavLink to="/login" data-testid="login">Login</CustomNavLink>
                        </>  
                    )
                    )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
)}


const CustomNavLink = ({ to, children }) => {
    return (
        <Button component={NavLink} to={to} activeClassName="active" color="inherit">
            {children}
        </Button>
    );
};
export default NavigationBar;
