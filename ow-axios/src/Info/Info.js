import React from 'react';
import './Info.css';

const info = (props) => {
    return (
        <div className={'info'}>
            <p>{props.content.description}</p>
        </div>
    )
};

export default info;