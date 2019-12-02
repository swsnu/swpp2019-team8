import React from 'react';

import { Table } from 'reactstrap';

const Petition = (props) => {
    let dueDate = '';
    for (var i=0;i<10;i++) dueDate += props.dueDate[i]
    return (
        <Table hover onClick={props.onClick}>
            <tbody>
                <tr>
                    <th scope="row">{props.state}</th>
                    <td>{props.category}</td>
                    <td>{props.title}</td>
                    <td>{dueDate}</td>
                    <td>{props.votes}</td>
                </tr>
            </tbody>
        </Table>
    )

}
export default Petition