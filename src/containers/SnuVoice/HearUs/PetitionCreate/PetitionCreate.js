import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { InputGroup, InputGroupAddon, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

class PetitionCreate extends Component {
    state = {
        agreeToTerms: false,
        petitionTitle: '',
        categoryList: [
            { value: 'All' },
            { value: 'human rights' },
            { value: 'welfare' },
        ],
        selectedCategory: '',
        petitionContent: '',
        petitionLink: '',
        petitionLinkList: [
        ],
        petitionTag: '',
        petitionTagList: [
        ],
    }

    ngOnInit = () => {
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

    onClickTagAddButton = () => {
        this.state.petitionTagList.push(this.state.petitionTag);
        this.setState({ petitionTag: '' });
        this.forceUpdate();
    }

    onClickTagDeleteButton = (event) => {
        this.state.petitionTagList.splice(event.target.value, 1);
        this.forceUpdate();
    }

    onClickPetitionConfirmButton = () => {
        //Todo: title중복
        //Todo: POST petition
        this.props.history.push('/hear_us');
    }

    onClickPetitionCancelButton = () => {
        //제안: alert("변경 사항은 저장되지 않습니다..이런거")
        this.props.history.push('/hear_us');
    }

    render() {
        const link_list = this.state.petitionLinkList.map((link, i) => {
            return (
                <div className="LinkList" key={i}>
                    {link}
                    <Button type="button" value={i} id="petition_link_add_button"
                        onClick={this.onClickLinkDeleteButton}>Delete Link</Button>
                </div>
            );
        });
        const tag_list = this.state.petitionTagList.map((tag, i) => {
            return (
                <div className="TagList" key={i}>
                    {tag}
                    <Button type="button" value={i} id="petition_tag_add_button"
                        onClick={this.onClickTagDeleteButton}>Delete Tag</Button>
                </div>
            );
        });
        const category_list = this.state.categoryList.map((v, i) => {
            return (
                <option key={i} value={v.value} label={v.value}></option>
            );
        });
        return (
            <div className="PetitionCreate">
                <Form>
                    {/* 청원 약관박스 만들기 */}
                    Agree
                    <FormGroup>
                        <Input type="checkbox" id="agree_to_terms_checkbox" checked={this.state.agreeToTerms}
                            onChange={() => this.onClickAgreeToTermsCheckBox()}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" id="petition_title_input" placeholder="title"
                            onChange={(event) => this.setState({ petitionTitle: event.target.value })}></Input>
                    </FormGroup>
                    Category
                    <Input type="select" id="petition_category_select" onChange={this.onChangeCategorySelect}>
                        {category_list}
                    </Input>
                    <FormGroup>
                        <Label>Content</Label>
                        <Input type="textarea" id="petition_content_textarea" placeholder="content"
                            onChange={(event) => this.setState({ petitionContent: event.target.value })}></Input>
                    </FormGroup>
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
                    <FormGroup >
                        <Label>Tag</Label>
                        <InputGroup>
                            <Input type="text" id="petition_tag_input" placeholder="new tag" value={this.state.petitionTag}
                                onChange={(event) => this.setState({ petitionTag: event.target.value })}></Input>
                            <InputGroupAddon addonType="prepend">
                                <Button type="button" id="petition_tag_add_button"
                                    onClick={this.onClickTagAddButton} disabled={!this.state.petitionTag}>Add Tag</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        {tag_list}
                    </FormGroup>
                    <ButtonGroup>
                        <Button type="button" id="petition_confirm_button"
                            onClick={this.onClickPetitionConfirmButton} disabled={!this.state.agreeToTerms || !this.state.petitionTitle || !this.state.petitionContent}>CONFIRM</Button>
                        <Button type="button" id="petition_cancel_button"
                            onClick={this.onClickPetitionCancelButton}>CANCEL</Button>
                    </ButtonGroup>
                </Form>
            </div >
        );
    }
}

export default connect(null, null)(withRouter(PetitionCreate));