import React, { useState, useLayoutEffect } from 'react';
import Attraction from './Attraction';
import './AttractionList.css';
import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material';


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
            const response = await fetch('/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("token")}`
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
        <Container maxWidth="sm" sx={{ display: 'flex', padding: 3, justifyContent: 'center', height: 'min-content' }}>
            <Paper className="attractionList" 
                sx={{ 
                width: { xs: '100%', md: 300 }, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                height: 'min-content' }}>
                {!hideSave? null: <h2 id="finalTripName"> Trip name : {savedTripName} </h2>}
                    <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" className = "startLocation">Start location: {startLocation}</Typography>
                    </Box>
                    {attractionsWithId.map(attractionWithId => (
                        <Box key={attractionWithId.id} className="attractionBlock" sx= {{ mb: 1.5 }} >
                            <Attraction id={attractionWithId.id} attraction={attractionWithId.attraction} attractionClicked={attractionClicked} disableClick={hideSave} />
                        </Box>
                    ))}
                    <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" className = "endLocation">End location: {endLocation}</Typography>   
                    </Box>
                {hideSave? null:
                <TextField
                    type="text"
                    placeholder="Enter trip name"
                    value={tripName}
                    className="tripname"
                    onChange={(e) => setTripName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                }
                {hideSave? null:<Button variant="contained" onClick={handleSaveButtonClick} className="saveButton" sx={{ mb: 10 }} disabled={tripName.trim() === ''}>
                    Save
                </Button>}

                
        
            </Paper>
        </Container>
)
}
export default AttractionList;