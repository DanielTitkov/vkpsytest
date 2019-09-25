import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Avatar, PanelHeader, Tabs, TabsItem } from '@vkontakte/vkui';
import { setActivePanel } from '../store/actions/panelActions';
import { connect } from 'react-redux';
import ErrorSnackbar from '../components/interface/ErrorSnackbar';
import ActiveInventorySnippet from '../components/inventories/ActiveInventorySnippet';
import NewInventories from '../components/inventories/NewInventories';
import DoneInventories from '../components/inventories/DoneInventories';
import { getCurrentUser } from '../store/actions/userActions';

const mapStateToProps = (state) => {
	return {
		inventories: state.inventory.inventories,
		inventoryError: state.inventory.error,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActivePanel: (panel) => dispatch(setActivePanel(panel)),
		getCurrentUser: () => dispatch(getCurrentUser()),
    }
}

const Home = (props) => {
	const { 
		id, go, fetchedUser, 
		openPopout, closePopout, 
		inventoryError,
		getCurrentUser,
	} = props;

	const [activeTab, setActiveTab] = useState("new");
	const [snackbar, setSnackbar] = useState(null);
	const errorSnackbar = <ErrorSnackbar onClose={() => setSnackbar(null)} error={inventoryError} />
	
	useEffect(() => {
		if (inventoryError) {
			setSnackbar(errorSnackbar)
		}
	}, [inventoryError])

	useEffect(() => {
		getCurrentUser();
	}, [])

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