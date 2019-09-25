import React, { useState, useEffect } from 'react';
import { View, Spinner, Footer } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import { connect } from 'react-redux';
import InventoryDetails from './panels/inventories/InventoryDetails';
import InventoryPlayer from './panels/inventories/InventoryPlayer';
import InventoryResult from './panels/results/InventoryResult';
import { getValidationQuery } from './store/actions/validationActions';
import { getCurrentUser } from './store/actions/userActions';

const mapStateToProps = (state) => {
    return {
		activePanel: state.panel.activePanel,
		vkquery: state.validation.vkquery,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		getValidationQuery: () => dispatch(getValidationQuery()),
		getCurrentUser: () => dispatch(getCurrentUser()),
    }
}

const App = props => {
	const { getValidationQuery, vkquery, getCurrentUser } = props;
	const [activePanel, setActivePanel] = useState('home');
	const [popout, setPopout] = useState(null);

	const openPopout = (popout) => {
		setPopout(popout);
	}
	
	const closePopout = () => {
		setPopout(null);
	}

	useEffect(() => {
		getValidationQuery();
		getCurrentUser();
	}, [])

	const go = (e) => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	if (vkquery) {
		return (
			<View popout={popout} activePanel={activePanel}>
				<Home 
					id="home" 
					go={go} 
					openPopout={openPopout} 
					closePopout={closePopout} 
				/>
				<InventoryDetails id="testdetails" go={go} />
				<InventoryPlayer id="testplayer" go={go} />
				<InventoryResult id="resultprofile" go={go} />
			</View>
		)
	} else {
		return (
			<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
				<Spinner size="large" style={{ marginTop: 20 }} />
				<Footer>Loading... If this doesn't go away you may be using the app outside of VK</Footer>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);