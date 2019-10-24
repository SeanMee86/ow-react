import React from 'react';
import './Characters.css';

const characters = props => {
    return (
        <div onClick={() => props.click(props.hero)} className={'character'}>
            <p>{props.content}</p>
        </div>
    )
};

export default characters;