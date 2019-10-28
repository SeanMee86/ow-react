import React from 'react';
import './Header.scss';

const header = (props) => {
  const style = {
    width: "100%"
  }
    return (
        <div className={'container'}>
            <div className={'row'}>
                <img style={style} src="/4683761209687671824_1.png" alt=""/>
            </div>
        </div>
    )
};

export default header;