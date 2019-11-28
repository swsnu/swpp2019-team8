import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index';

import UpperBar from '../../UpperBar/UpperBar';
import SearchBar from '../SearchBar/SearchBar';

import { Button } from 'reactstrap';

import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.css';

export class PhotoDetail extends Component {

    onClickPhotoCancelButton = () => {
        this.props.history.push('/tell_me');
    }

    componentDidMount = async () => {
        await this.props.getPhoto(this.props.match.params.photo_title)
        if (this.props.selectedPhoto === null) {
            this.props.history.push('/NotFound')
        }
    }


    render() {
        let photo = '';
        let title = '';
        let markdownHtml = '';

        if (this.props.selectedPhoto) {
            var md = new Remarkable('full', {
                html: true,
                typographer: true,
                highlight: function (str, lang) {
                    return highlightCode(str, lang);
                }
            });
            photo = this.props.selectedPhoto.photo;
            title = this.props.selectedPhoto.title;
            markdownHtml = md.render(this.props.selectedPhoto.content);
        }


        return (
            <div>
                <UpperBar />
                <div className='TopOfPage'>
                    <SearchBar />
                    <div className="photoDetail">
                        <br />
                        <h4 className="document">Document:</h4>
                        <br />
                        <h1 className="title">{title}</h1>
                        <hr />
                        <img src={"http://localhost:8000/api/tellme/media/" + photo} />
                        <hr />
                        <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
                        <hr />
                        <Button
                            type="button"
                            id="photo_cancel_button"
                            onClick={this.onClickPhotoCancelButton}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedPhoto: state.tm.selectedPhoto
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getPhoto: (photo_title) =>
            dispatch(actionCreator.getPhoto(photo_title))
    }

}

export function highlightCode(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(lang, str).value;
        } catch (err) { console.log(err) }
    }

    try {
        return hljs.highlightAuto(str).value;
    } catch (err) { console.log(err) }
    return ''; // use external default escaping
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PhotoDetail));