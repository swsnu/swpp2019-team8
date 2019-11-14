import React from 'react';
// import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function DebateList(props) {
    return (
        <div>
            <p>
                <Button 
                    onClick={props.onClick}
                    value={props.id}
                    id="debate_title_button">{props.debate.title}</Button> | {props.debate.author}
            </p>
        </div>
    )
}

export default DebateList