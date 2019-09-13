import React from 'react';
import vkconnect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import { connect } from 'react-redux';
import InventoryDetails from './panels/inventories/InventoryDetails';
import InventoryPlayer from './panels/inventories/InventoryPlayer';
import InventoryResult from './panels/results/InventoryResult';
import { getValidationQuery } from './store/actions/validationActions';

const mapStateToProps = (state) => {
    return {
		activePanel: state.panel.activePanel,
		// vkquery: state.validation.vkquery
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		getValidationQuery: () => dispatch(getValidationQuery())
    }
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			popout: null,
		};
	}

	openPopout = (popout) => {
		this.setState({ 
			...this.state,
			popout: popout
		});
	}
	
	closePopout = () => {
		this.setState({ 
			...this.state,
			popout: null
		});
	}

	componentDidMount() {
		this.props.getValidationQuery();
		vkconnect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					console.log(this.state.fetchedUser);
					break;
				default:
					console.log(e.detail.type);
			}
		});
		vkconnect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		if (this.state.fetchedUser || 1) {
			return (
				<View popout={this.state.popout} activePanel={this.state.activePanel}>
					<Home 
						id="home" 
						fetchedUser={this.state.fetchedUser} 
						go={this.go} 
						openPopout={this.openPopout} 
						closePopout={this.closePopout} 
					/>
					<InventoryDetails id="testdetails" go={this.go} />
					<InventoryPlayer id="testplayer" go={this.go} />
					<InventoryResult id="resultprofile" go={this.go} />
				</View>
			)
		} else {
			return (
				<div>
					<h1>This app can be used only as VK Mini App</h1>
				</div>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);