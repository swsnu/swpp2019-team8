import React from 'react';

import { Button, ButtonGroup } from 'reactstrap';

const Category = (props) => {
    return (
        <ButtonGroup size="lg">
            <Button type="button" id="category_button_1" value="what"
                onClick={props.onClick}>All</Button>
            <Button type="button" id="category_button_2" value="wha"
                onClick={props.onClick}>wow</Button>
            <Button type="button" id="category_button_3" value="wh"
                onClick={props.onClick}>뭐하지</Button>
            <Button type="button" id="category_button_4" value="w"
                onClick={props.onClick}>뭐있지</Button>
        </ButtonGroup>
    )
}
export default Category;