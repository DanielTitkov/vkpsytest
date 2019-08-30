import React, { useState } from 'react';
import TestItemLikert from './TestItemLikert';

export default function TestBody() {
    const testData = {
        items: [
            {
                content: "Foo",
                id: 1,
                response: null
            },
            {
                content: "Bar",
                id: 2,
                response: null
            }
        ],
        id: 1,
        type: "likert"
    }

    const handleResponse = (item) => {
        setTest(
            ...test,
            //test.find(i => i.id === item.id);
            // https://stackoverflow.com/questions/39889009/replace-object-in-array-on-react-state
        );
    }
    const [ test, setTest ] = useState(testData);
    return test.items.length ? (
        <div>
            { test.items.map(item => {
                return <TestItemLikert 
                    item={ item } 
                    handleResponse={ handleResponse } 
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
