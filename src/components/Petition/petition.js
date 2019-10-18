import React from 'react';

import { Button, Table } from 'reactstrap';

const Petition = (props) => {
    return (
        <Table hover>
            <tbody>
                <tr>
                    <th scope="row">{props.state}</th>
                    <td>{props.category}</td>
                    <td><Button type="button" id="petition_title_button"
                        onClick={props.onClickDetailButton}>{props.title}</Button>
                    </td>
                    <td>{props.dueDate}</td>
                    <td>{props.votes}</td>
                </tr>
            </tbody>
        </Table>
    )

}
export default Petition