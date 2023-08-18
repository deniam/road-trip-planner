import React, { useState} from 'react';

const JourneyForm = ({ navigate, submitLocations } ) => {
  const [waypoints, setWaypoints] = useState([]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let locations = [startLocation];
    for (let i = 0; i < waypoints.length; i++) {
        if (waypoints[i].value !== ''){
            locations.push(waypoints[i].value);
        }
    }
    locations.push(endLocation);
    
    let response = await fetch( '/attractions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locations:locations })
    })
  
    if(response.status !== 201) {
      navigate('/planner')
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token);
      submitLocations(startLocation, endLocation, data.attractions)
    }
  }

  const handleStartLocationChange = (event) => {
    setStartLocation(event.target.value)
  }

  const handleEndLocationChange = (event) => {
    setEndLocation(event.target.value)
  }

  const handleWaypointChange = (id, value) => {
    const updatedWaypoints = waypoints.map(waypoint =>
        waypoint.id === id ? { ...waypoint, value } : waypoint
      );
      setWaypoints(updatedWaypoints);
  };

  const handleAddField = () => {
    const newWaypointID = waypoints.length + 1;
    setWaypoints([...waypoints, { id: newWaypointID, value: '' }]);
  };
 

    return (
      <form onSubmit={handleSubmit} className='journeyForm'>
        <input placeholder="Start Location" id="startLocation" type='text' value={ startLocation } onChange={handleStartLocationChange} required />
        {waypoints.map(waypoint => (
          <div key={waypoint.id}>
            <input
              className ="waypoint"
              type="text"
              id={waypoint.id}
              value={waypoint.value}
              onChange={e => handleWaypointChange(waypoint.id, e.target.value)}
            />
          </div>
        ))}
        <button id="addWaypoint" type="button" onClick={handleAddField}>Add Waypoint</button>
        <input placeholder="End Location" id="endLocation" type='text' value={ endLocation } onChange={handleEndLocationChange} required/>
      <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default JourneyForm;
