import React from 'react';
import { Button, Footer } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { sendActiveInventoryResponse } from '../../store/actions/inventoryActions';

const mapStateToProps = (state) => {
	return {
		activeInventory: state.inventory.activeInventory,
		activeInventoryResponse: state.inventory.activeInventoryResponse,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendActiveInventoryResponse: () => dispatch(sendActiveInventoryResponse())
    }
}

function InventorySendControl(props) {
    const { activeInventory, activeInventoryResponse, sendActiveInventoryResponse } = props;

    const handleSend = () => {
        sendActiveInventoryResponse()
    }

    return (
        <div>
            { activeInventoryResponse && Object.keys(activeInventoryResponse).length === activeInventory.questions.length ? (
                <Button 
                    size="xl" 
                    level="commerce"
                    onClick={ handleSend }
                >
                    Отправить!
                </Button>
            ) : (
                <Footer><h3>Answer all questions to get the result</h3></Footer>
            ) }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (InventorySendControl);