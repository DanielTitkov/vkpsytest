import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Avatar, PanelHeader } from '@vkontakte/vkui';
import { setActivePanel } from '../store/actions/panelActions';
import { connect } from 'react-redux';
import ErrorSnackbar from '../components/interface/ErrorSnackbar';
import ActiveInventorySnippet from '../components/inventories/ActiveInventorySnippet';
import NewInventories from '../components/inventories/NewInventories';

const mapStateToProps = (state) => {
	return {
		inventories: state.inventory.inventories,
		inventoryError: state.inventory.error,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActivePanel: (panel) => dispatch(setActivePanel(panel)),
    }
}

const Home = (props) => {
	const { 
		id, go, fetchedUser, 
		openPopout, closePopout, 
		inventoryError
	} = props;

	const [snackbar, setSnackbar] = useState(null);
	const errorSnackbar = <ErrorSnackbar onClose={() => setSnackbar(null)} error={inventoryError} />
	
	useEffect(() => {
		if (inventoryError) {
			setSnackbar(errorSnackbar)
		}
	}, [inventoryError])

	return (
		<Panel id={id}>
			<PanelHeader>VK Psy Test</PanelHeader>

			{fetchedUser &&
			<Group title="User Data Fetched with VK Connect">
				<ListItem
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</ListItem>
			</Group>}

			<ActiveInventorySnippet go={go} />

			<NewInventories go={go} openPopout={openPopout} closePopout={closePopout} />					

			{ snackbar }
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

export default connect(mapStateToProps, mapDispatchToProps) (Home);