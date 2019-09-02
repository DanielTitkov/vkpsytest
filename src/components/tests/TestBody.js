import React, { useState } from 'react';
import TestItemLikert from './TestItemLikert';
import { connect } from 'react-redux';
import { updateActiveTestResponse } from '../../store/actions/testActions';

const mapStateToProps = (state) => {
	return {
		activeTest: state.test.activeTest
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveTestResponse: (response) => dispatch(updateActiveTestResponse(response))
    }
}

function TestBody(props) {
    const { activeTest } = props;
    const handleResponse = (itemId, response) => {
        updateActiveTestResponse(itemId, response);
    }
    
    return activeTest.items.length ? (
        <div>
            { activeTest.items.map(item => {
                console.log(item)
                return <TestItemLikert 
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

export default connect(mapStateToProps, mapDispatchToProps) (TestBody);