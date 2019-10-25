import React from 'react';
import './Info.css';

const info = (props) => {
    return (
        <div className={'info'}>
            <h1>{props.content.name}</h1>
            <p>{props.content.description}</p>
        </div>
    )
};

export default info;