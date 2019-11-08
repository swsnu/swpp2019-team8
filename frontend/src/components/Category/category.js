import React from 'react';

import { Button, ButtonGroup } from 'reactstrap';

const Category = (props) => {
    return (
        <ButtonGroup size="lg">
            <Button type="button" id="category_button_1" value="All"
                onClick={props.onClick}>All</Button>
            <Button type="button" id="category_button_2" value="human rights"
                onClick={props.onClick}>Human Rights</Button>
            <Button type="button" id="category_button_3" value="welfare"
                onClick={props.onClick}>Welfare</Button>
            <Button type="button" id="category_button_4" value="traffic"
                onClick={props.onClick}>Traffic</Button>
            <Button type="button" id="category_button_5" value="education"
                onClick={props.onClick}>Education</Button>
            <Button type="button" id="category_button_5" value="administration"
                onClick={props.onClick}>Administration</Button>
            <Button type="button" id="category_button_6" value="facility"
                onClick={props.onClick}>Facility</Button>
        </ButtonGroup>
    )
}
export default Category;