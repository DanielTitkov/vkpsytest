import React from 'react';
import vkconnect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import TestPlayer from './panels/tests/TestPlayer';
import TestResult from './panels/results/TestResult';
import { connect } from 'react-redux';
import TestDetails from './panels/tests/TestDetails';

const mapStateToProps = (state) => {
    return {
        activePanel: state.panel.activePanel
    }
}

export default connect(mapStateToProps) (class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		vkconnect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
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
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<TestDetails id="testdetails" go={this.go} />
				<TestPlayer id="testplayer" go={this.go} />
				<TestResult id="resultprofile" go={this.go} />
			</View>
		);
	}
})