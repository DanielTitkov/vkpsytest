import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Avatar, PanelHeader, List } from '@vkontakte/vkui';
import TestSnippet from '../components/tests/TestSnippet';
import { setActivePanel } from '../store/actions/panelActions';
import { connect } from 'react-redux';
import { setActiveTest } from '../store/actions/testActions';

const mapDispatchToProps = (dispatch) => {
    return {
		setActivePanel: (panel) => dispatch(setActivePanel(panel)),
		setActiveTest: (test) => dispatch(setActiveTest(test))
    }
}

const Home = (props) => {
	const mockData = {
		tests: [
			{title: "ТИПИ", desc: "Тен итем персоналити инвентори. Кароче, короткий тест про личность.", id: 1},
			{title: "Эм-эм-пи-ай", desc: "Очень длинный тест. Пятьсот вопросов. Или семьсот даже.", id: 2},
			{title: "Тест Сонди", desc: "Ну и не тест в общем-то, а одна сплошая чемергесина.", id: 3},
		]	
	}

	const [ tests, setTests ] = useState(mockData);
	const { id, go, fetchedUser, setActivePanel } = props;
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
					{ tests.tests.length && tests.tests.map(test => {
						return (
							<TestSnippet test={ test } key={ test.id } go={ go } /> 
						)
					}) }
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

export default connect(null, mapDispatchToProps) (Home);
