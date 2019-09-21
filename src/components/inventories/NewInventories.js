import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Group, List, Spinner, Div } from '@vkontakte/vkui';
import InventorySnippet from './InventorySnippet';
import { getInventories } from '../../store/actions/inventoryActions';

const mapStateToProps = (state) => {
	return {
		inventories: state.inventory.inventories,
		inventoryError: state.inventory.error,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		getInventories: () => dispatch(getInventories())
    }
}

function NewInventories(props) {
    const { 
        inventories, inventoryError, go,
        openPopout, closePopout,
        getInventories
    } = props;

    useEffect(() => {
        getInventories()
    }, []);

    return (
        <Group title="Avaliable inventories">
            <List>
                { inventories ? (
                    inventories.length && inventories.map(inventory => {
                        return (
                            <InventorySnippet 
                                inventory={ inventory } 
                                key={ inventory.id } 
                                go={ go } 
                                openPopout={ openPopout } 
                                closePopout={ closePopout }								
                            />
                        )
                    }) 
                ) : ( inventoryError ? (
                        <Div><b>Ошибка при загрузке: </b>{ inventoryError.toString() }</Div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Spinner size="regular" style={{ marginTop: 20 }} />
                        </div>
                    )
                ) }
            </List>
        </Group>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (NewInventories);