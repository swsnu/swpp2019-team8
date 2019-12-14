import React from "react";

import { ListGroupItem } from "react-bootstrap";

const DebateComments = props => {
    return (
        <div>
            <ListGroupItem className="debateComment">
                <div className="debateComment_header">
                    <div className="debateComment_author">{props.author}</div> 
                    <div className="debateComment_time"> {props.date.substring(0, 10)}{" "}{props.date.substring(11, 16)}</div>
                </div>
                <div className="debateComment_body">{props.comment}</div>
            </ListGroupItem>
            <br/>
            </div>
    );
};

export default DebateComments;
