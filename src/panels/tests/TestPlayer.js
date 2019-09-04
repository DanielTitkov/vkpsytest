import React from 'react';
import {Panel, PanelHeader, HeaderButton, InfoRow, Progress, platform, Div, IOS, FixedLayout} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import TestBody from '../../components/tests/TestBody';
import { connect } from 'react-redux';

const osname = platform();
const mapStateToProps = (state) => {
	return {
		activeTest: state.test.activeTest
	}
}

function TestPlayer(props) {
	const { activeTest } = props;
	const testProgress = activeTest.items.filter(i=>i.response).length / activeTest.items.length * 100;
    return (
        <Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</HeaderButton>}
			>
				Test Player: { activeTest.title }
			</PanelHeader>
			<Div>
				<TestBody />
			</Div>
			{/* <Div>
				<Button size="xl" level="2" onClick={go} data-to="resultprofile">
					Show result page
				</Button>
			</Div> */}
			<FixedLayout vertical="bottom">
				<Div style={{background: "#fafafa", opacity: 0.9}}>
					<InfoRow title="Test progress">
						<Progress value={ testProgress } />
					</InfoRow> 
				</Div>  
			</FixedLayout>
		</Panel>
    )
}

TestPlayer.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default connect(mapStateToProps) (TestPlayer);