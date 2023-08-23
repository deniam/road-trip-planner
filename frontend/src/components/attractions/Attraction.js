import React, { useState } from 'react';
import './Attraction.css';
import { Button, Typography } from '@mui/material';

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
        <Button 
            id={id}
            disabled={disableClick}
            onClick={handleClick} 
            className={clicked ? 'Attraction clicked' : 'Attraction'}
            variant="outlined" 
        >
            <div>
            <Typography variant="h6" gutterBottom className='name'>
                {attraction.name} 
            </Typography>
            
            <Typography variant="body1" className='address'>
                {attraction.vicinity}
            </Typography>
            
            <Typography variant="body2" className='rating'>
                Rating: {attraction.rating}
            </Typography>
            </div>
        </Button>
        );
}

export default Attraction;