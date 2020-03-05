import React from 'react';
import classes from './CharacterSelect.module.scss'

const characterSelect = (props) => {

    return (
        <div className={classes.characterSelect}>
            {
                props.characters.map((character, ind) =>
                    <div key={ind} onClick={() => props.selectCharacter(character)}  className={classes.character}>
                        <img src={`https://d1u1mce87gyfbn.cloudfront.net/hero/${character.picture_name}/hero-select-portrait.png`} alt=""/>
                    </div>
                )
            }
        </div>
    )
};

export default characterSelect;