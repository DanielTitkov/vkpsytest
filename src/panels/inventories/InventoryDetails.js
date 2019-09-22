import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, Div, IOS, Button, Group, List, Cell } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const osname = platform();
const mapStateToProps = (state) => {
	return {
		activeInventory: state.inventory.activeInventory
	}
}

function InventoryDetails(props) {
    const { activeInventory, go } = props;
    const inventoryDone = activeInventory.status === "done";
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
            >
                Test Details: { activeInventory.title }
            </PanelHeader>
            <Group title="Описание">
                <List>
                    <Cell multiline>
                        { activeInventory.details }
                    </Cell>
                </List>
            </Group>
            <Group title="Инструкция">
                <List>
                    <Cell multiline>
                        { activeInventory.instruction }
                    </Cell>
                </List>
            </Group>
            <Div>
                <Button 
                    size="xl" 
                    level="2" 
                    onClick={go} 
                    data-to={ inventoryDone ? "resultprofile" : "testplayer" } 
                >
                    { inventoryDone ? "Смотреть результаты" : "Пройти тест" } 
                </Button>
            </Div>
        </Panel>
    )
}

InventoryDetails.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default connect(mapStateToProps) (InventoryDetails);