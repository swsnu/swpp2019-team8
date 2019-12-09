import React, { Component } from "react";
import classnames from 'classnames';

import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
	Button,
	Table,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

import Upperbar from "../../UpperBar/UpperBar";
import Petition from "../../../../components/Petition/petition";
import PetitionTableHeader from "../../../../components/Petition/petitionTableHeader";
import * as actionCreator from "../../../../store/actions/index";


export class MyPetition extends Component {
	state = {
		selectedCategory: "All",
		signIn: '',
		selectedTab: 'Author',
		selectedNumber: 1
	}

	componentDidMount = async () => {
		await this.props.getCurrentUser();
		if (this.props.signIn) {
			await this.props.getPetitionByUser(this.props.selectedUser.id);
			await this.props.getPetitionByComment();
		}
	}

	onClickTabButton = (event) => {
		this.setState({ selectedTab: event })
	}

	onClickDetailButton = (petition) => {
		this.props.history.push('/hear_us/petition/' + petition.url)
	}

	onClickMoreButton = () => {
		let selectedNumber = this.state.selectedNumber + 1;
		this.setState({
			selectedNumber: selectedNumber
		})
	}

	// onClickCategoryButton = (event) => {
	//   this.setState({ selectedCategory: event.target.value })
	// }

	ngOnInit = async () => {
		if (this.state.signIn === '') {
			await this.props.getCurrentUser();
			if (!this.props.signIn) {
				alert("You must be logged in to see your petitions");
				this.props.history.push("/hear_us");
			} else {
				this.setState({
					signIn: true
				})
			}
		} else if (!this.props.signIn) {
			alert("You must be logged in to see your petitions");
			this.props.history.push('/hear_us')
		}
	}

	render() {
		this.ngOnInit();

		let tabButtons = (
			<Nav tabs>
				<NavItem>
					<NavLink
						id="author_tab_button"
						className={classnames({ active: this.state.selectedTab === 'Author' })}
						onClick={() => this.onClickTabButton('Author')}>
						Author
            </NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						id="voter_tab_button"
						className={classnames({ active: this.state.selectedTab === 'Voter' })}
						onClick={() => this.onClickTabButton('Voter')}>
						Voter
            </NavLink>
				</NavItem>
			</Nav>
		)

		let myPetitionList = this.props.petitionList.map((petition, i) => {
			if (i < this.state.selectedNumber * 10) {
				return (
					<Petition
						key={i}
						url={petition.url}
						title={petition.title}
						state={petition.status}
						category={petition.category}
						dueDate={petition.end_date}
						votes={petition.votes}
						onClick={() => this.onClickDetailButton(petition)} />
				)
			} else return undefined;
		});
		let myCommentPetitionList = this.props.petitionListByComment.map((petition, i) => {
			if (i < this.state.selectedNumber * 10) {
				return (
					<Petition
						key={i}
						url={petition.url}
						title={petition.title}
						state={petition.status}
						category={petition.category}
						dueDate={petition.end_date}
						votes={petition.votes}
						onClick={() => this.onClickDetailButton(petition)} />
				)
			} else return undefined;
		})



		return (
			<div className="TopOfPage" >
				<Upperbar />
				<div className="MyPetition">
					<br />
					{/* <SearchBar/> */}
					<h1>{this.props.selectedUser.nickname}`s Petitions</h1>
					{tabButtons}
					<TabContent activeTab={this.state.selectedTab}>
						<TabPane tabId='Author'>
							<br />
							<PetitionTableHeader />
							{myPetitionList}
							<Button type="button" id="more_author_button"
								onClick={this.onClickMoreButton}
								disabled={this.props.petitionList.length < this.state.selectedNumber * 10}
							>+</Button>
						</TabPane>
						<TabPane tabId='Voter'>
							<br />
							<PetitionTableHeader />
							{myCommentPetitionList}
							<Button type="button" id="more_voter_button"
								onClick={this.onClickMoreButton}
								disabled={this.props.petitionListByComment.length < this.state.selectedNumber * 10}
							>+</Button>
						</TabPane>
					</TabContent>
					<br />
				</div>
			</div>
		);
	}
}

export const mapStateToProps = state => {
	return {
		selectedUser: state.usr.selectedUser,
		petitionList: state.hu.petition_list,
		petitionListByComment: state.hu.petition_list_by_comment,
		signIn: state.usr.signIn
	};
};

export const mapDispatchToProps = dispatch => {
	return {
		getPetitionByUser: user_id =>
			dispatch(actionCreator.getMyPetitions(user_id)),
		getPetitionByComment: () =>
			dispatch(actionCreator.getMyPetitionsByComment()),
		getCurrentUser: () =>
			dispatch(actionCreator.checkSignIn())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(MyPetition));
