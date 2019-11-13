import React from 'react';
// import { Link } from 'react-router-dom';

function DebateList(props) {
    return (
        <div>
            <p>
                {props.debate.title} | {props.debate.author}
            </p>
        </div>
    )
}

export default DebateList