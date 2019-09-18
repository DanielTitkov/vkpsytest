import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '@vkontakte/vkui';

const mapStateToProps = (state) => {
	return {
        activeInventory: state.inventory.activeInventory,
        activeInventoryResult: state.inventory.activeInventoryResult        
	}
}

function ResultBody(props) {
    const { activeInventoryResult } = props;
    return (
        <div>
            { activeInventoryResult ? (
                activeInventoryResult.length && activeInventoryResult.map(result => {
                    return (
                        <div key={ result.scale }> 
                            <p>Scale: { result.title }</p>
                            <p>Raw score: { result.raw }</p>
                            <p>Processed score: { result.value }</p>
                        </div>
                    )
                })
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            ) }
        </div>
    )
}

export default connect(mapStateToProps, null) (ResultBody);