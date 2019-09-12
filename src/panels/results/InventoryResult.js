import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';

const osname = platform();

function InventoryResult(props) {
    return (
        <Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</HeaderButton>}
			>
				Results Profile
			</PanelHeader>
		</Panel>
    )
}

InventoryResult.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default InventoryResult;
