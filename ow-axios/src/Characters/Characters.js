import React from 'react';
import './Characters.css';

const characters = props => {
    return (
        <div onClick={() => props.click(props.hero)} className={'character'}>
            <img src={`https://d1u1mce87gyfbn.cloudfront.net/hero/${props.content}/hero-select-portrait.png`} alt=""/>
        </div>
    )
};

export default characters;