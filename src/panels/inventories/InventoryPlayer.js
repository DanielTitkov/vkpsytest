import React, { useState, useEffect } from 'react';
import {Panel, PanelHeader, HeaderButton, InfoRow, Progress, platform, Div, IOS, FixedLayout} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InventoryBody from '../../components/inventories/InventoryBody';
import InventorySendControl from '../../components/inventories/InventorySendControl';
import ErrorSnackbar from '../../components/interface/ErrorSnackbar';

const osname = platform();
const mapStateToProps = (state) => {
	return {
		activeInventory: state.inventory.activeInventory,
		activeInventoryResponse: state.inventory.activeInventoryResponse,
		inventoryError: state.inventory.error,
	}
}

function InventoryPlayer(props) {
	const { activeInventory, activeInventoryResponse, inventoryError } = props;

	const [snackbar, setSnackbar] = useState(null);
	const errorSnackbar = <ErrorSnackbar onClose={() => setSnackbar(null)} error={inventoryError} />
	
	useEffect(() => {
		if (inventoryError) {
			setSnackbar(errorSnackbar)
		}
	}, [inventoryError])

	const progress = activeInventoryResponse ? (Object.keys(activeInventoryResponse).length / activeInventory.questions.length * 100) : 0
    return (
        <Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</HeaderButton>}
			>
				Test Player: { activeInventory.title }
			</PanelHeader>
			<Div>
				<InventoryBody />
			</Div>
			<Div>
				<InventorySendControl />
				<div style={{marginBottom: "100px"}}></div>
			</Div>
			<FixedLayout vertical="bottom">
				<Div style={{background: "#fafafa", opacity: 0.9}}>
					<InfoRow title="Test progress">
						<Progress value={ progress } />
					</InfoRow> 
				</Div>  
			</FixedLayout>
			{ snackbar }
		</Panel>
    )
}

InventoryPlayer.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default connect(mapStateToProps) (InventoryPlayer);