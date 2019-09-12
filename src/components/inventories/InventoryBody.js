import React from 'react';
import { connect } from 'react-redux';
import InventoryItemLikert from './InventoryItemLikert';

const mapStateToProps = (state) => {
	return {
		activeInventory: state.inventory.activeInventory
	}
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

function InventoryBody(props) {
    const { activeInventory } = props;
    
    return activeInventory.items.length ? (
        <div>
            { activeInventory.items.map(item => {
                return <InventoryItemLikert
                    item={ item } 
                    key={ item.id }
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