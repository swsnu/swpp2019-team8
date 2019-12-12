import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { InputGroup, InputGroupAddon, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actionCreators from '../../../../store/actions/index';

import './PetitionCreate.css';
import UpperBar from '../../UpperBar/UpperBar';

class PetitionCreate extends Component {
    state = {
        agreeToTerms: false,
        petitionTitle: '',
        categoryList: [
            { value: '-', label: '- Select Category -' },
            { value: 'human rights', label: 'Human Rights' },
            { value: 'welfare', label: 'Welfare' },
            { value: 'traffic', label: 'Traffic' },
            { value: 'education', label: 'Education' },
            { value: 'administration', label: 'Administration' },
            { value: 'facility', label: 'Facility' },
        ],
        selectedCategory: '-',
        petitionContent: '',
        petitionLink: '',
        petitionLinkList: [
        ],
        petitionTag: '',
        petitionTagList: [
        ],
        signIn: ''
    }

    ngOnInit = async () => {
        if (this.state.signIn === '') {
            await this.props.onCheckSignIn();
            if (!this.props.signIn) {
                alert("You must logged in to Create Petition");
                this.props.history.push('/hear_us')
            } else {
                this.setState({
                    signIn: this.props.signIn
                })
            }
        } else if (!this.props.signIn) {
            alert("You must logged in to Create Petition");
            this.props.history.push('/hear_us')

        }
        //check authentication
    }

    onClickAgreeToTermsCheckBox = () => {
        this.setState({ agreeToTerms: !this.state.agreeToTerms });
    }

    onChangeCategorySelect = (event) => {
        this.setState({ selectedCategory: event.target.value });
    }

    onClickLinkAddButton = () => {
        this.state.petitionLinkList.push(this.state.petitionLink);
        this.setState({ petitionLink: '' });
        this.forceUpdate();
    }

    onClickLinkDeleteButton = (event) => {
        this.state.petitionLinkList.splice(event.target.value, 1);
        this.forceUpdate();
    }
    onClickPetitionConfirmButton = () => {
        let temp = window.confirm('You cannot edit anymore. Are you sure?');
        if (!temp) return;
        let retLink = '';
        for (var i in this.state.petitionLinkList) {
            retLink += this.state.petitionLinkList[i] + ' ';
        }
        this.props.onStorePetition(this.state.petitionTitle, this.state.petitionContent, this.state.selectedCategory, /*retTag ,*/ retLink);
    }

    onClickPetitionCancelButton = () => {
        this.props.history.push('/hear_us');
    }

    render() {
        this.ngOnInit();
        const link_list = this.state.petitionLinkList.map((link, i) => {
            return (
                <div className="LinkList" key={i}>
                    <a href={link} target="_sub">{link}</a>
                    <Button type="button" value={i} id="petition_link_delete_button"
                        onClick={this.onClickLinkDeleteButton}>Delete Link</Button>
                </div>
            );
        });
        const category_list = this.state.categoryList.map((v, i) => {
            return (
                <option key={i} value={v.value} label={v.label}></option>
            );
        });
        return (
            <div>
                <UpperBar />
                <div className="PetitionCreate">
                    <Form>
                        <b><br />
                            <h1 className="petition_create_title">Create New Petition</h1>
                            <br />
                            <div className="inputTop">
                                <Input type="textarea" id="petition_terms_textarea" placeholder="content" readOnly
                                    defaultValue="Cautions when you create new petition:"></Input>
                                <div className="agree">

                                    <FormGroup>
                                        <Input type="checkbox" id="agree_to_terms_checkbox" checked={this.state.agreeToTerms}
                                            onChange={() => this.onClickAgreeToTermsCheckBox()}></Input>
                                    </FormGroup>Agree
                            </div>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" id="petition_title_input" placeholder="title"
                                        onChange={(event) => this.setState({ petitionTitle: event.target.value })}></Input>
                                </FormGroup>
                                Category
                    <Input type="select" id="petition_category_select" onChange={this.onChangeCategorySelect}>
                                    {category_list}
                                </Input>
                            </div>
                            <br />
                            <FormGroup>
                                <Label>Content</Label>
                                <Input type="textarea" id="petition_content_textarea" placeholder="content" style={{ height: 200 }}
                                    onChange={(event) => this.setState({ petitionContent: event.target.value })}></Input>
                            </FormGroup>
                            <div className="inputBottom">

                                <FormGroup>
                                    <Label>Link</Label>
                                    <InputGroup>
                                        <Input type="text" id="petition_link_input" placeholder="new link" value={this.state.petitionLink}
                                            onChange={(event) => this.setState({ petitionLink: event.target.value })}></Input>
                                        <InputGroupAddon addonType="prepend">
                                            <Button type="button" id="petition_link_add_button"
                                                onClick={this.onClickLinkAddButton} disabled={!this.state.petitionLink}>Add Link</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {link_list}
                                </FormGroup>
                                <ButtonGroup className="buttons">
                                    <Button type="button" id="petition_confirm_button"
                                        onClick={this.onClickPetitionConfirmButton} disabled={!this.state.agreeToTerms || !this.state.petitionTitle || !this.state.petitionContent || this.state.selectedCategory === '-'}>CONFIRM</Button>
                                    <Button type="button" id="petition_cancel_button"
                                        onClick={this.onClickPetitionCancelButton}>CANCEL</Button>
                                </ButtonGroup>
                            </div>
                            <br /><br /><br />

                        </b>
                    </Form>
                </div >
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onStorePetition: (title, content, category, /*tag,*/ link) =>
            dispatch(actionCreators.postPetition({ title: title, content: content, category: category, /*tag: tag,*/ link: link })),
        onCheckSignIn: () =>
            dispatch(actionCreators.checkSignIn())
    }
}

export const mapStateToProps = state => {
    return {
        signIn: state.usr.signIn
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PetitionCreate));