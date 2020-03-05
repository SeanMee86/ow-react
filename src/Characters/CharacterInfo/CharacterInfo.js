import React, {Fragment} from 'react';
import classes from './CharacterInfo.module.scss';

const characterInfo = (props) => {
    return (
        <Fragment>
            <div className={`${classes.info} col-lg-9`}>
                <div className={classes.topInfoContainer}>
                    <div onClick={() => props.returnToSelect()} className={classes.image} >
                        <img src={`https://d1u1mce87gyfbn.cloudfront.net/hero/${props.character.picture_name}/hero-select-portrait.png`} alt=""/>
                    </div>
                    <div className={classes.topInfo}>
                        <h1>{props.character.name} - {props.character.affiliation ? props.character.affiliation : 'No Affiliation'}</h1>
                        <p>{props.character.description}</p>
                        <p><strong>Age: </strong>{props.character.age ? props.character.age : "N/A"}</p>
                        <p><strong>Base of Operations:</strong> {props.character.base_of_operations ? props.character.base_of_operations : 'N/A'}</p>
                    </div>
                </div>
                <div className={classes.abilities}>
                    <h2><u>Abilities</u></h2>
                    {(props.character.abilities.map((ability, ind) =>{
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
                </div>
            </div>
        </Fragment>
    )
};

export default characterInfo;