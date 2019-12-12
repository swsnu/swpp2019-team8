import React from 'react';

import { Button, ButtonGroup } from 'reactstrap';

import './category.css';

const Category = (props) => {
    return (
        <div className="category_box">
            {/* <h5 className="category header">Category</h5> */}
        <ButtonGroup size="lg" className="category_buttongroup">
            <Button className="category_button" id="category_button_1" value="All"
                onClick={props.onClick}>All</Button>
            <Button className="category_button" id="category_button_2" value="human rights"
                onClick={props.onClick}>Human Rights</Button>
            <Button className="category_button" id="category_button_3" value="welfare"
                onClick={props.onClick}>Welfare</Button>
            <Button className="category_button" id="category_button_4" value="traffic"
                onClick={props.onClick}>Traffic</Button>
            <Button className="category_button" id="category_button_5" value="education"
                onClick={props.onClick}>Education</Button>
            <Button className="category_button" id="category_button_5" value="administration"
                onClick={props.onClick}>Administration</Button>
            <Button className="category_button" id="category_button_6" value="facility"
                onClick={props.onClick}>Facility</Button>
        </ButtonGroup>
        </div>
    )
}
export default Category;