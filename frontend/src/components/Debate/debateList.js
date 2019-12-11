import React from 'react';
import { Link } from 'react-router-dom';

function debateList(props) {
    return (
        <div>
            <p>
                <Link
                    exact to={'/tell_me/documents/' + props.document + '/debates/' + props.id}
                    value={props.id}
                    id="debate_title_button">{props.title}</Link>
            </p>
        </div>
    )
}

export default debateList