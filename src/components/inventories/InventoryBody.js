import React from 'react';
import { connect } from 'react-redux';
import InventoryItemLikert from './InventoryItemLikert';

const mapStateToProps = (state) => {
	return {
        activeInventory: state.inventory.activeInventory,
        activeInventoryResponse: state.inventory.activeInventoryResponse
	}
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

function InventoryBody(props) {
    const { activeInventory, activeInventoryResponse } = props;  
    return activeInventory.questions.length ? (
        <div>
            { activeInventory.questions.map(question => {
                return <InventoryItemLikert
                    question={ question }
                    response={ activeInventoryResponse && activeInventoryResponse[question.id] ? activeInventoryResponse[question.id].response : 0 }
                    key={ question.id }
                /> 
            }) }
        </div>
    ) : (
        <div> 
            For some peculiar reason test has no items.
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (InventoryBody);