import React, { Fragment } from 'react';

function DATE(props) {
    return (
        <Fragment>
           
           <option value={props.date} className='dateOption'>

            {props.date}
            
            </option>

        </Fragment>

    );
}

export default DATE;
