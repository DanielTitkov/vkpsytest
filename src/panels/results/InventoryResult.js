import React, { useState, useEffect } from 'react';
import { Panel, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import ErrorSnackbar from '../../components/interface/ErrorSnackbar';
import { connect } from 'react-redux';
import ResultBody from '../../components/results/ResultBody';
import { setActiveInventory } from '../../store/actions/inventoryActions';

const osname = platform();

const mapStateToProps = (state) => {
	return {
		activeInventory: state.inventory.activeInventory,
		inventoryError: state.inventory.error,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setActiveInventory: (inventory) => dispatch(setActiveInventory(inventory))
	}
}

function InventoryResult(props) {

	const {
		activeInventory,
		inventoryError,
		setActiveInventory,
	} = props;

	const [snackbar, setSnackbar] = useState(null);
	const errorSnackbar = <ErrorSnackbar onClose={() => setSnackbar(null)} error={inventoryError} />
	
	useEffect(() => {
		if (inventoryError) {
			setSnackbar(errorSnackbar);
		}
	}, [inventoryError])

	const handleGoBack = (e) => {
		props.go(e);
		setActiveInventory(null); 
	}

    return (
        <Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={handleGoBack} data-to="home">
					{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</HeaderButton>}
			>
				Results Profile: { activeInventory && activeInventory.title }
			</PanelHeader>
			<ResultBody />
			{ snackbar }
		</Panel>
    )
}

InventoryResult.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (InventoryResult);
