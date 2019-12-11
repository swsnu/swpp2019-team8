import React from 'react';

import { ListGroupItem } from 'react-bootstrap';

const DebateComments = (props) => {
    return (
        <p>
            <ListGroupItem>{props.comment}  {props.author} {props.date}</ListGroupItem>
        </p>
    )
}

export default DebateComments