import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Tabs, TabsItem } from '@vkontakte/vkui';
import { setActivePanel } from '../store/actions/panelActions';
import { connect } from 'react-redux';
import ErrorSnackbar from '../components/interface/ErrorSnackbar';
import ActiveInventorySnippet from '../components/inventories/ActiveInventorySnippet';
import NewInventories from '../components/inventories/NewInventories';
import DoneInventories from '../components/inventories/DoneInventories';
import UserSnippet from '../components/user/UserSnippet';

const mapStateToProps = (state) => {
	return {
		inventories: state.inventory.inventories,
		inventoryError: state.inventory.error,
		currentUser: state.user.currentUser,
		userError: state.user.error,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActivePanel: (panel) => dispatch(setActivePanel(panel)),
    }
}

const Home = (props) => {
	const { 
		id, go, 
		currentUser, userError,
		openPopout, closePopout, 
		inventoryError,
	} = props;

	const [activeTab, setActiveTab] = useState("new");
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
			<UserSnippet currentUser={ currentUser } />
			<ActiveInventorySnippet go={go} />
            <Group>
				<Tabs theme="light">
					<TabsItem
						onClick={() => setActiveTab("new")}
						selected={activeTab === 'new'}
					>
						Новые
					</TabsItem>
					<TabsItem
						onClick={() => setActiveTab("done")}
						selected={activeTab === 'done'}
					>
						Готовые
					</TabsItem>
				</Tabs>
            </Group>

			{ activeTab === "done" ? (
				<DoneInventories go={go} openPopout={openPopout} closePopout={closePopout} />
			) : (
				<NewInventories go={go} openPopout={openPopout} closePopout={closePopout} />					
			) }
		
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