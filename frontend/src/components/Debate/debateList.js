import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function debateList(props) {
    return (
        <div>
            <p>
                <Button 
                    onClick={props.onClick}
                    value={props.id}
                    id="debate_title_button">{props.title}</Button> | {props.author} | hi
            </p>
        </div>
    )
}

export default debateList