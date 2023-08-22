import React, { useEffect, useState } from 'react';
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
                        'authorization': window.localStorage.getItem('token')
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
        <div className='myTrips'>
            {trips.map((trip, index) => (
                <div key={index}>
                    <AttractionList attractions={trip.attractions} startLocation={trip.startLocation} endLocation={trip.endLocation} hideSave={"ON"} savedTripName={trip.tripName}/>
                </div>
            ))}
        </div>

    )

}

export default TripList;