import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Button, Input } from 'reactstrap';

class DebateCreate extends Component {
    state={
        debateTitle: '',
        debateContent: ''
    }

    //check authentication? Is it required at front??

    onClickConfirmButton = () => {
        //check title duplication
        this.props.history.push('???')
    }

    render() {
        return (
            <div>
                <div className="DebateCreate">
                    <h1>DebateCreate</h1>
                    <Input 
                        type="text" 
                        id="debate_title_input" 
                        placeholder="Debate Title"
                        onChange = {(event) => this.setState({ debateTitle: event.target.value })}
                        />
                    <Input
                        type="textarea" 
                        id="debate_content_textarea"
                        placeholder="Debate Content" 
                        onChange={(event) => this.setState({ debateContent: event.target.value })}
                        />
                </div>
                <br />
                <Button 
                    id="debate_confirm_button"
                    onClick={this.onClickConfirmButton}>CONFIRM</Button>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DebateCreate));