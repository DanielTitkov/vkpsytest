import React from 'react';
import { Cell, Alert } from '@vkontakte/vkui';
import { setActiveInventory } from '../../store/actions/inventoryActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		activeInventory: state.inventory.activeInventory
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActiveInventory: (inventory) => dispatch(setActiveInventory(inventory))
    }
}

function InventorySnippet(props) {
    const { inventory, go, setActiveInventory, activeInventory, openPopout, closePopout } = props;
    const popout = <Alert
        actions={[
            {
                title: 'Отмена',
                autoclose: true,
                style: 'cancel'
            },
            {
                title: 'Открыть!',
                autoclose: true,
                action: () => {setActiveInventory(inventory); go({currentTarget: {dataset: {to: "testdetails"}}});},
            }
        ]}
        onClose={closePopout}
    >
        <h2>Подтвердите действие</h2>
        <p>У вас уже открыт другой тест. Если сейчас откроете новый, то ответы в старом не сохранятся. Открыть?</p>
    </Alert>

    return (
        <Cell 
            description={ "Количество пунктов: " + inventory.questions.length }
            expandable onClick={ 
                activeInventory && activeInventory.id !== inventory.id ? (
                    () => openPopout(popout)
                ) : (
                    (e) => {setActiveInventory(inventory); go(e);}
                )
            } 
            data-to="testdetails" 
            indicator="Подробнее"
        >
            <p className="inventory-snippet-title">{ inventory.title }</p>
            <p className="inventory-snippet-desc">{ inventory.description } </p>
        </Cell>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (InventorySnippet);