import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Avatar, PanelHeader, List, Spinner } from '@vkontakte/vkui';
import TestSnippet from '../components/tests/TestSnippet';
import { setActivePanel } from '../store/actions/panelActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setActiveTest } from '../store/actions/testActions';
// import { firebaseConnect } from 'react-redux-firebase'; // ??? 
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => {
	return {
		tests: state.firestore.ordered.tests
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActivePanel: (panel) => dispatch(setActivePanel(panel)),
		setActiveTest: (test) => dispatch(setActiveTest(test))
    }
}

const Home = (props) => {
	const { id, go, fetchedUser, setActivePanel, tests } = props;
	console.log(props)
	return (
		<Panel id={id}>
			<PanelHeader>Example</PanelHeader>
			{fetchedUser &&
			<Group title="User Data Fetched with VK Connect">
				<ListItem
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</ListItem>
			</Group>}

			<Group title="Avaliable tests">
				<List>
					{ tests ? (
						tests.length && tests.map(test => {
							return (
								<TestSnippet test={ test } key={ test.id } go={ go } /> 
							)
						}) 
					) : (
						<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
							<Spinner size="regular" style={{ marginTop: 20 }} />
						</div>
					) }
				</List>
			</Group>
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: "tests" }
	])
) (Home);