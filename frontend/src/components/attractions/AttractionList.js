import React, { useState, useLayoutEffect } from 'react';
import Attraction from './Attraction';
import { Typography, Paper, Container } from '@mui/material';

const AttractionList = ({ navigate, attractions, startLocation, endLocation, hideSave, savedTripName} ) => {
    const [attractionsWithId, setAttractionsWithId] = useState([]);
    const [tripName, setTripName] = useState('');
    useLayoutEffect(() =>{
        let newAttractionsArray = []
        
        for (let i = 0; i < attractions.length; i++){
            newAttractionsArray.push({id:i, attraction:attractions[i], selected: false})
        } 
        setAttractionsWithId(newAttractionsArray)
    }, [attractions])

    const attractionClicked = (id, selected) =>{
        const updatedattractionsWithId = attractionsWithId.map(attractionWithId =>
            attractionWithId.id === id ? { ...attractionWithId, selected } : attractionWithId
        );
        setAttractionsWithId(updatedattractionsWithId);
    }

    
    const handleSaveButtonClick = async () => {
        
        let finalAttractionsList = []
        for (let i = 0; i < attractionsWithId.length; i++){
            if (attractionsWithId[i].selected){
                finalAttractionsList.push(attractionsWithId[i].attraction)
                
            }

        } 
        
        const tripData = {
            tripName: tripName,
            startLocation: startLocation,
            endLocation: endLocation,
            attractions: finalAttractionsList,
        };

        try {
            const response = await fetch('/myTrips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.getItem('token')
                },
                body: JSON.stringify(tripData),
            });
            if (response.status !== 201) {
                throw new Error('Error saving trip:');
            } else {
                const data = await response.json();
                window.localStorage.setItem('token', data.token);
                navigate('/myTrips');
            }
        } catch (error) {
            console.error('Error saving trip:', error);
        }
    }


    return (
    <Container maxWidth="sm">
    
    {!hideSave ? (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Trip name: {savedTripName}</Typography>    
        </Paper>
    ) : null}
    
    <Typography variant="subtitle1">Start location:</Typography>
    <Typography>{startLocation}</Typography>
    
    {attractionsWithId.map(item => (
        <Paper key={item.id} sx={{ p: 1, my: 1 }}>
        <Attraction 
            {...item}
            attractionClicked={attractionClicked}
            disableClick={hideSave}  
        />
        </Paper>
    ))}
    
    <Typography variant="subtitle1">End location:</Typography>
    <Typography>{endLocation}</Typography>
    
    {!hideSave ? (
        <TextField 
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        />
    ) : null}
    
    {!hideSave ? (  
        <Button
        onClick={handleSaveButtonClick}
        disabled={tripName.trim() === ''} 
        >
        Save
        </Button>  
    ) : null}
    
    </Container>
)
}
export default AttractionList;