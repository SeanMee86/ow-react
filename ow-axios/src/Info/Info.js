import React from 'react';
import './Info.css';

const info = (props) => {
    return (
        <div className={'info'}>
            <h1>{props.content.name}</h1>
            <p>{props.content.description}</p>
            <button onClick={() => {props.click()}} className="btn btn-outline-primary">Return to Character Select</button>
        </div>
    )
};

export default info;