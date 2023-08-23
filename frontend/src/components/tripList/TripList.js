import React, { useEffect, useState } from 'react';
import { Typography, Paper, Container } from '@mui/material';
import AttractionList from '../attractions/AttractionList';

const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [username, setUsername] = useState({});
    
    useEffect(() => {
                
        async function getData(){
            try {
                const response = await fetch('/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                    }
                });
                if (response.status !== 201) {
                    throw new Error('Error retrieving trips:');
                } else {
                    const data = await response.json();
                    window.localStorage.setItem('token', data.token);
                    setTrips(data.trips);
                    setUsername(data.username);
                }
            } catch (error) {
                console.error('Error retrieving trips:', error);
            }
            
        }

        getData()

    }, [])
        

    return (
        <Container maxWidth="md" sx={{ py: 3, display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        height: 'min-content' }}>
            {trips.map((trip, index) => (
                <Paper elevation={3} key={index} sx={{ p: 1, my: 2,  }}>
                    <AttractionList savedTripName={trip.tripName} attractions={trip.attractions} startLocation={trip.startLocation} endLocation={trip.endLocation} hideSave={"ON"} />
                </Paper>
            ))}
        </Container>
    );
};

export default TripList;