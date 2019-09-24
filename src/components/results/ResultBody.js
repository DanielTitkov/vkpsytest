import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Group, List, Cell } from '@vkontakte/vkui';
import { getActiveInventoryResult } from '../../store/actions/inventoryActions';
import ProfileChart from './ProfileChart';

const mapStateToProps = (state) => {
	return {
        activeInventory: state.inventory.activeInventory,
        activeInventoryResult: state.inventory.activeInventoryResult        
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		getActiveInventoryResult: () => dispatch(getActiveInventoryResult())
    }
}

function ResultBody(props) {
    const { activeInventoryResult, getActiveInventoryResult } = props;

    useEffect(() => {
        getActiveInventoryResult()
    }, []) // add input? 

    return (
        <div>
            { activeInventoryResult ? (
                <span>
                    <Group title="Profile">
                        <List>
                            <Cell multiline>
                                <ProfileChart data={ activeInventoryResult } />
                            </Cell>
                        </List>
                    </Group>           
                    <Group title="Results">
                        <List>
                            <Cell multiline>
                                { activeInventoryResult.length && activeInventoryResult.map(result => {
                                    return (
                                        <div key={ result.scale }> 
                                            <p>Scale: { result.title }</p>
                                            <p>Raw score: { result.raw }</p>
                                            <p>Processed score: { result.value }</p>
                                        </div>
                                    )
                                }) } 
                            </Cell>
                        </List>
                    </Group>
                </span>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            ) }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (ResultBody);