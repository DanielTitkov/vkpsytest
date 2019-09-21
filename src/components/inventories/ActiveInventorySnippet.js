import React from 'react';
import { connect } from 'react-redux';
import { Group, List, Avatar, Cell, Button } from '@vkontakte/vkui';

const mapStateToProps = (state) => {
	return {
        activeInventory: state.inventory.activeInventory,
        activeInventoryResponse: state.inventory.activeInventoryResponse
	}
}

function ActiveInventorySnippet(props) {
    const { activeInventory, activeInventoryResponse, go } = props; 
    return (
        activeInventory ? (
            <Group title="Активный тест">
                <List>
                    <Cell 
                        before={<Avatar size={72} />}
                        multiline
                        size='l'
                        description={ 
                            "Вопросов с ответами: " 
                            + (activeInventoryResponse ? Object.keys(activeInventoryResponse).length : 0)
                            + " из " 
                            + activeInventory.questions.length
                        }
                        bottomContent={
                            <div>
                                <Button onClick={go} data-to="testplayer">Продолжить</Button>
                            </div>
                        }
                    >
                        { activeInventory.title }
                    </Cell>
                </List>
            </Group>
        ) : (
            null
        )
    )
}

export default connect(mapStateToProps, null) (ActiveInventorySnippet);