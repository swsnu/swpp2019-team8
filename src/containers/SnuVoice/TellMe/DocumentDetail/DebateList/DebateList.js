import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

import Debate from '../../../../../components/Debate/debate'

class DebateList extends Component {

    onClickDetailButton = (event) => {
        this.props.history.push('???')
    }

    onClickCreateButton = (event) => {
        this.props.history.push('???')
    }


    render() {
        
        return (
            <div>
                <div className="DebateList">
                    <h1>Debate List</h1>
                    <h3>Document Title</h3>
                    <Debate />

                </div>
                <Button>NEW</Button>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DebateList));