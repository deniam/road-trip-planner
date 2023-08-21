        import React, { useState, useLayoutEffect } from 'react';
        import Attraction from './Attraction';

        const AttractionList = ({ navigate, attractions, startLocation, endLocation, hideSave, savedTripName} ) => {
            const [attractionsWithId, setAttractionsWithId] = useState([]);
            const [tripName, setTripName] = useState('');
            useLayoutEffect(() =>{
                let newAttractionsArray = []
                
                for (let i = 0; i < attractions.length; i++){
                    newAttractionsArray.push({id:i, attraction:attractions[i], selected: false})
                } 
                setAttractionsWithId(newAttractionsArray)
            }, [])

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
                <div className="attractionList">
                    {!hideSave? null: <h2 id="finalTripName"> Trip name : {savedTripName} </h2>}
                    <div>
                        <h2 className = "startLocation">Start location: {startLocation}</h2>
                        {attractionsWithId.map(attractionWithId => (
                            <div key={attractionWithId.id}>
                                <Attraction id={attractionWithId.id} attraction={attractionWithId.attraction} attractionClicked={attractionClicked} disableClick={hideSave} />
                            </div>
                        ))}
                        <h2 className = "endLocation">End location: {endLocation}</h2>   
                    </div>
                    {hideSave? null:
                    <input
                        type="text"
                        placeholder="Enter trip name"
                        value={tripName}
                        className="tripname"
                        onChange={(e) => setTripName(e.target.value)}
                    />
                    }
                    {hideSave? null:<button onClick={handleSaveButtonClick} className="saveButton" disabled={tripName.trim() === ''}>
                        Save
                    </button>}
                    
            
                </div>
        )
}
        export default AttractionList;