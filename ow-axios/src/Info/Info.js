import React from 'react';
import './Info.scss';

const info = (props) => {
    return (
        <div className={'info col-lg-8'}>
            <h1>{props.content.name} - {props.content.affiliation ? props.content.affiliation : 'No Affiliation'}</h1>
            <p>{props.content.description}</p>
            <p><strong>Age: </strong>{props.content.age ? props.content.age : "N/A"}</p>
            <p><strong>Base of Operations:</strong> {props.content.base_of_operations ? props.content.base_of_operations : 'N/A'}</p>
            <h2><u>Abilities</u></h2>
            {(props.content.data.abilities.map((ability, ind) =>{
                return (
                    <div key={ind}>
                        <div>
                            <h3>{ability.name}{ability.is_ultimate ? ` - Ultimate Ability` : null}</h3>
                            <p>{ability.description}</p>
                        </div>
                        <hr/>
                    </div>
                )
            }))}
            <button onClick={() => {props.click()}} className="btn btn-outline-primary">Return to Character Select</button>
        </div>
    )
};

export default info;