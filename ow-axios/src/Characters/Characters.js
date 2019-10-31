import React from 'react';
import './Characters.scss';

const characters = props => {
    const style = {
        width: "150px",
        margin: "10px 25px 10px 15px"
    };
    return (
        <div style={!props.actionToTake ? style : null} onClick={() => props.actionToTake ? props.loadSingleChar(props.hero) : props.loadAllChars()} className={'character'}>
            <img src={`https://d1u1mce87gyfbn.cloudfront.net/hero/${props.content}/hero-select-portrait.png`} alt=""/>
        </div>
    )
};

export default characters;