import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

import Debate from '../../../../../components/Debate/debate';
import Upperbar, { mapDispatchToProps } from '../../../UpperBar/UpperBar';
import { mapStateToProps } from '../DocumentDetail';

class DebateList extends Component {

    onClickDetailButton = (event) => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + "/debates/" + this.props.match.params.debate_id);
    }

    onClickCreateButton = (event) => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + "/debates/create");
    }


    render() {
        let documentTitle = '';

        return (
            <div>
            <Upperbar />
            <div className="TopOfPage">

                <div className="DebateList">
                    <h1>Debate List</h1>
                    <h3>Document Title</h3>
                    <Debate />

                </div>
                <Button>NEW</Button>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateList));