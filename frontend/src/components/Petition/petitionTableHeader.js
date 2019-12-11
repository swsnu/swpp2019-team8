import React from "react";

import { Table } from "reactstrap";

import "./petitionTableHeader.css";

export const petitionTableHeader = () => {
    return (
        <Table className="petitionTableHeader">
            <thead>
                <tr>
                    <th width="15%">State</th>
                    <th width="15%">Category</th>
                    <th width="40%">Title</th>
                    <th width="20%">Due</th>
                    <th width="10%">Votes</th>
                </tr>
            </thead>
        </Table>
    );
};

export default petitionTableHeader;
