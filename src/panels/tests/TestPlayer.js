import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';

const osname = platform();

export default function TestPlayer(props) {
    return (
        <Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</HeaderButton>}
			>
				Test Player
			</PanelHeader>
		</Panel>
    )
}

TestPlayer.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
