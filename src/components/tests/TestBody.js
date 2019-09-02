import React, { useState } from 'react';
import TestItemLikert from './TestItemLikert';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		activeTest: state.test.activeTest
	}
}

function TestBody(props) {
    const { activeTest } = props;
    const [ testResponse, setTestResponse ] = useState({
        testId: activeTest.id,
        items: activeTest.items.map(item => ({
            id: item.id,
            response: null    
        }))
    });

    const handleResponse = (itemId, response) => {
        setTestResponse({
            ...testResponse,
            testId: activeTest.id,
            items: testResponse.items.map(item => {
                return item.id === itemId ? {...item, response: response} : {...item}
            })
        });
    }
    
    return activeTest.items.length ? (
        <div>
            { activeTest.items.map(item => {
                return <TestItemLikert 
                    item={ item } 
                    handleResponse={ handleResponse } 
                    key={ item.id }
                    response={ testResponse.items.filter(ir => ir.id === item.id ) }
                /> 
            }) }
        </div>
    ) : (
        <div> 
            For some peculiar reason test has no items.
        </div>
    )
}

export default connect(mapStateToProps, null) (TestBody);