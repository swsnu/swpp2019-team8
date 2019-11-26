import React from 'react';

import { Button, Table } from 'reactstrap';

const Petition = (props) => {
    let dueDate = '';
    for (var i=0;i<10;i++) dueDate += props.dueDate[i]
    return (
        <Table hover>
            <tbody>
                <tr>
                    <th scope="row">{props.state}</th>
                    <td>{props.category}</td>
                    <td><Button type="button" id="petition_title_button" value={props.url}
                        onClick={props.onClick}>{props.title}</Button>
                    </td>
                    <td>{dueDate}</td>
                    <td>{props.votes}</td>
                </tr>
            </tbody>
        </Table>
    )

}
export default Petition