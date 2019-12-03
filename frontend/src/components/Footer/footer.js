import React from 'react';

import {
    Row,
    Col,
} from 'reactstrap'

import './footer.css';
import Logo from  '../../img/Logo_gray.png';

export const footer = () => {
    return (
        <div className="footer">
            <br/>
            <div className="footer_content">
            SWPP Team 8 Project: SNU Wiki, Petition site<br/>
            Share the Voice<br/>
            </div>
            <br/>
            <img src={Logo} style = {{height:40}}/>
            <br/><br/>
        </div>
    )
}

export default footer;