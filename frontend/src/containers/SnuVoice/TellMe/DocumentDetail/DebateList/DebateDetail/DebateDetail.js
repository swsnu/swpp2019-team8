import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Button, Input } from 'reactstrap';

import DebateComments from '../../../../../../components/Debate/debateComments'

import Upperbar from '../../../../UpperBar/UpperBar';

class DebateDetail extends Component {

    


    render() {
        return (
            <div>
                <Upperbar/>
                <div className="TopOfPage">

        <div className="DebateDetail">
            <div>
                <h1>DebateDetail</h1>
            </div>
            <Input 
                type="textarea" 
                id="debate_content_textarea"
                placeholder="Enter debate comment"/>
            <Button>CONFIRM</Button>
                </div>
                </div>
        </div>
        )
    }
}

export default connect(null, null)(withRouter(DebateDetail));