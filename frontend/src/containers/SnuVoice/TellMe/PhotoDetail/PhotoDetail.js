import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index';

import UpperBar from '../../UpperBar/UpperBar';

import { Button } from 'reactstrap';

import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.css';

import './PhotoDetail.css';

export class PhotoDetail extends Component {

    onClickPhotoCancelButton = () => {
        this.props.history.push('/tell_me');
    }

    componentDidMount = async () => {
        await this.props.getPhoto(this.props.match.params.photo_title)
        if (this.props.selectedPhoto === null) {
            this.props.history.push('/tell_me/photo' + this.props.match.params.photo_title + '/notfound')
        }
    }

    onClickCopyURL = () => {
        var obShareUrl = document.getElementById("ShareUrl");
        obShareUrl.select();
        document.execCommand("Copy");
        alert("URL이 클립보드에 복사되었습니다");
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
                    <div className="photoDetail">
                        <br />
                        <br />
                        <h1 className="photo_title">{title}</h1>
                        <hr />
                        <img src={"/api/tellme/media/" + photo} alt="Uploaded img" />

                        <br /><br />
                        <div className="url_copy_button">
                            <input type="text" id="ShareUrl" value={"https://www.snuvoice.site/api/tellme/media/" + photo} />
                            &nbsp;
                            <Button onClick={this.onClickCopyURL}>URL Copy</Button>
                        </div>
                        Markdown lets you insert a photo into your document.
                        <br />
                        For more information, see <a href="https://www.snuvoice.site/tell_me/documents/TELL-ME:%EB%AC%B8%EB%B2%95%20%EB%8F%84%EC%9B%80%EB%A7%90">TELL-ME:문법 도움말</a>
                        <hr />
                        <div className="photo_detail" dangerouslySetInnerHTML={{ __html: markdownHtml }} />
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
        } catch (err) { console.log("err") }
    }

    try {
        return hljs.highlightAuto(str).value;
    } catch (err) { console.log("err") }
    return ''; // use external default escaping
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PhotoDetail));