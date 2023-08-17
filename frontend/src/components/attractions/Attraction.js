import React, { useState } from 'react';

const Attraction = ({id, attraction, attractionClicked, disableClick}) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        let clickState = clicked;
        if (clickState === true) {
            clickState = false;
        } else {
            clickState = true;
        }
        setClicked(clickState);
        attractionClicked(id, clickState);
    }
  
      return (
        <button disabled={disableClick} onClick={handleClick} className="Attraction">
            <div>
                <p className="name">{attraction.name}</p>
                <p className='address'>{attraction.vicinity}</p>
                <p className='rating'>{attraction.rating}</p>
            </div>
        </button>
      );
  }
  
  export default Attraction;
  