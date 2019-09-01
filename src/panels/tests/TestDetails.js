import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, Div, IOS, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const osname = platform();
const mapStateToProps = (state) => {
	return {
		activeTest: state.test.activeTest
	}
}

function TestDetails(props) {
    const { activeTest, go } = props;
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
            >
                Test Details: { activeTest }
            </PanelHeader>
            <Div>
                <Button size="xl" level="2" onClick={go} data-to="testplayer">
                    Пройти тест! 
                </Button>
            </Div>
        </Panel>
    )
}

TestDetails.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default connect(mapStateToProps) (TestDetails);