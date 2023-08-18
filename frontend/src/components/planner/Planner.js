import React, { useState, useEffect} from 'react';
import JourneyForm from '../journey/JourneyForm';
import AttractionList from '../attractions/AttractionList';

const Planner = ({ navigate} ) => {
    const [attractions, setAttractions] = useState([]);
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    
    useEffect(() => {
        if (window.localStorage.getItem("token") === null){
            navigate('/login')
        };
    });
    
    const submitLocations = (startLocation, endLocation, attractions) =>{
        setAttractions(attractions);
        setStartLocation(startLocation);
        setEndLocation(endLocation);
    }

    const submitAttractions = (finalAttractions) =>{
        setAttractions(finalAttractions);
    }

    if (attractions.length ===0) {
        return (<JourneyForm navigate={navigate} submitLocations={submitLocations}/>);
    } else {
        return (
        <div className='planner'>
            <h3 id='startLocation'>{startLocation}</h3>
                <AttractionList navigate={navigate} attractions={attractions} submitAttractions={submitAttractions}/>
            <h3 id='endLocation'>{endLocation}</h3>
        </div>    
        );
    }
    
}

export default Planner;