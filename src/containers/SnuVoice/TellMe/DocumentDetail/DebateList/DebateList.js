import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

import Debate from '../../../../../components/Debate/debatelist'

class DebateList extends Component {

    onClickDetailButton = (event) => {
        this.props.history.push('???')
    }

    onClickCreateButton = (event) => {
        this.props.history.push('???')
    }


    render() {
        
        return (
            <div className="DebateList">
                <h1>Debate List</h1>
                <Debate />
                <Button>NEW</Button>
            </div>


        )
    }
}

export default connect(null, null)(withRouter(DebateList));