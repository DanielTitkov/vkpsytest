import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Avatar, PanelHeader, List, Spinner, Cell, Button } from '@vkontakte/vkui';
import { setActivePanel } from '../store/actions/panelActions';
import { connect } from 'react-redux';
import { getInventories, setActiveInventory } from '../store/actions/inventoryActions';
import InventorySnippet from '../components/inventories/InventorySnippet';

const mapStateToProps = (state) => {
	return {
		inventories: state.inventory.inventories,
		activeInventory: state.inventory.activeInventory,
		activeInventoryResponse: state.inventory.activeInventoryResponse
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActivePanel: (panel) => dispatch(setActivePanel(panel)),
		setActiveInventory: (inventory) => dispatch(setActiveInventory(inventory)),
		getInventories: () => dispatch(getInventories())
    }
}

const Home = (props) => {
	const { 
		id, go, fetchedUser, activeInventory, 
		activeInventoryResponse, 
		openPopout, closePopout, 
		inventories 
	} = props;
	useEffect(() => {
		props.getInventories()
	}, []);
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

			{activeInventory && 
			<Group title="Активный тест">
				<List>
					<Cell 
						before={<Avatar size={72} />}
						multiline
						size='l'
						description={ 
							"Вопросов с ответами: " 
							+ (activeInventoryResponse ? Object.keys(activeInventoryResponse).length : 0)
							+ " из " 
							+ activeInventory.questions.length
						}
						bottomContent={
							<div>
								<Button onClick={go} data-to="testplayer">Продолжить</Button>
							</div>
						}
					>
						{ activeInventory.title }
					</Cell>
				</List>
			</Group>
			}

			<Group title="Avaliable inventories">
				<List>
					{ inventories ? (
						inventories.length && inventories.map(inventory => {
							return (
								<InventorySnippet 
									inventory={ inventory } 
									key={ inventory.id } 
									go={ go } 
									openPopout={ openPopout } 
									closePopout={ closePopout }								
								/>
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

export default connect(mapStateToProps, mapDispatchToProps) (Home);