import React from 'react';

import { Table } from 'reactstrap';

const Petition = (props) => {
    let dueDate = '';
    for (var i=0;i<10;i++) dueDate += props.dueDate[i]
    return (
        <Table hover onClick={props.onClick}>
            <tbody>
                <tr>
                    <td width="15%">{props.state}</td>
                    <td width="15%">{props.category}</td>
                    <th width="40%">{props.title}</th>
                    <td width="20%">{dueDate}</td>
                    <th width="10%">{props.votes}</th>
                </tr>
            </tbody>
        </Table>
    )

}
export default Petition