import React from 'react';

import './footer.css';
import Logo from  '../../img/Logo_gray.png';

export const footer = () => {
    return (
        <div className="footer">
            <br/>
            <div className="footer_text">
            SWPP Team 8 Project: SNU Wiki, Petition site<br/>
            Kiwan Kim . Dongseok Heo . Donghyun Lee . Jeongrok Seo<br/>
            Share the Voice
            </div>
            <br/>
            <img src={Logo} style = {{height:30}}/>
            <br/><br/>
        </div>
    )
}

export default footer;