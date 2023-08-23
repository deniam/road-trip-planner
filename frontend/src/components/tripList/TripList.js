import React, { useEffect, useState } from 'react';
import { Typography, Paper, Container } from '@mui/material';
import AttractionList from '../attractions/AttractionList';
import { Diversity1 } from '@mui/icons-material';

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
        <Container className="myTrips" maxWidth="md" sx={{ py: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        height: 'min-content'}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.25, fontFamily: 'monospace', fontWeight: 700 }}>My Trips</Typography>
            {trips.map((trip) => (
                <div>
                    <AttractionList savedTripName={trip.tripName} attractions={trip.attractions} startLocation={trip.startLocation} endLocation={trip.endLocation} hideSave={"ON"} />
                </div>
            ))}
        </Container>
    );
};

export default TripList;