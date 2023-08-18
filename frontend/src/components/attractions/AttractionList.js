import React, { useState, useLayoutEffect } from 'react';
import Attraction from './Attraction';

const AttractionList = ({ navigate, attractions, disableClicks, disableNextButton, submitAttractions} ) => {
    const [attractionsWithId, setAttractionsWithId] = useState([]);

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
        let finalAttractionsList = []
        for (let i = 0; i < attractionsWithId.length; i++){
            if (attractionsWithId[i].selected){
                finalAttractionsList.push(attractionsWithId[i].attraction)
            }
        } 
        submitAttractions(finalAttractionsList);
    }

    return (
        <div className="attractionList">
            {attractionsWithId.map(attractionWithId => (
                <div key={attractionWithId.id}>
                    <Attraction id={attractionWithId.id} attraction={attractionWithId.attraction} disableClick={disableClicks} attractionClicked={attractionClicked} />
                </div>
            ))}
            {disableNextButton ? null:<button onClick={handleNextButtonClick} className="nextButton"> Next </button>}
        </div>
    )

}




export default AttractionList;