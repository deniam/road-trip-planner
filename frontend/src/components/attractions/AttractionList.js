        import React, { useState, useLayoutEffect } from 'react';
        import Attraction from './Attraction';

        const AttractionList = ({ navigate, attractions, disableClicks, disableNextButton, submitAttractions, startLocation, endLocation} ) => {
            const [attractionsWithId, setAttractionsWithId] = useState([]);
            const [tripName, setTripName] = useState('');
            const [showAttractions, setShowAttractions] = useState(true);
            const [showSaveForm, setShowSaveForm] = useState(false);

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

            const handleNextButtonClick = (event) => {
                event.preventDefault();
                setShowAttractions(false);
                setShowSaveForm(true);
                
            }
            const handleSaveButtonClick = async () => {
                if (tripName.trim() !== '') {
                    let finalAttractionsList = []
                for (let i = 0; i < attractionsWithId.length; i++){
                    if (attractionsWithId[i].selected){
                        finalAttractionsList.push(attractionsWithId[i].attraction)
                    }
                } 
                submitAttractions(finalAttractionsList);
                const tripData = {
                    tripName: tripName,
                    startLocation: startLocation,
                    endLocation: endLocation,
                    attractions: finalAttractionsList
                };

                try {
                    const response = await fetch('/trips', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
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
        };

            return (
                <div>
            {showAttractions && (
                <div>
                    {attractionsWithId.map(attractionWithId => (
                        <div key={attractionWithId.id}>
                            <Attraction id={attractionWithId.id} attraction={attractionWithId.attraction} disableClick={disableClicks} attractionClicked={attractionClicked} />
                        </div>
                    ))}
                    {!disableNextButton && <button onClick={handleNextButtonClick} className="nextButton"> Next </button>}
                </div>
            )}

            {showSaveForm && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter trip name"
                        value={tripName}
                        className="tripname"
                        onChange={(e) => setTripName(e.target.value)}
                    />
                    <button onClick={handleSaveButtonClick} className="saveButton" disabled={tripName.trim() === ''}>
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}
        export default AttractionList;