import React from 'react';

import { ListGroupItem } from 'react-bootstrap';

const DebateComments = (props) => {
    return (
        <p>
            <ListGroupItem>{props.comment}  {props.author} {props.date.substring(0, 10)} {props.date.substring(11, 16)}</ListGroupItem>
        </p>
    )
}

export default DebateComments