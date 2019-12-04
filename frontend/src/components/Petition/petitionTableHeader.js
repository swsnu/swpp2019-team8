import React from "react";

import { Table } from "reactstrap";

export const petitionTableHeader = () => {
    return (
        <Table>
            <thead>
                <tr>
                    <th width="15%">State</th>
                    <th width="15%">Category</th>
                    <th width="40%">Title</th>
                    <th width="20%">due</th>
                    <th width="10%">votes</th>
                </tr>
            </thead>
        </Table>
    );
};

export default petitionTableHeader;
