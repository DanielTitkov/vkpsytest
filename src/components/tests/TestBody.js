import React, { useState } from 'react';
import TestItemLikert from './TestItemLikert';

export default function TestBody() {
    const testData = {
        items: [
            {
                content: "Кто я - тварь дрожащая или право имею?",
                id: 1,
                response: null,
                scale: {
                    min: 0,
                    max: 4,
                    minLabel: "Тварь дрожащая",
                    maxLabel: "Право имею"
                }
            },
            {
                content: "Я рыбы отведал и пали покровы, я видел сквозь марево дня как движется по небу витязь багровый, чье око взыскует меня.",
                id: 2,
                response: null,
                scale: {
                    min: 0,
                    max: 4,
                    minLabel: "Не согласен",
                    maxLabel: "Согласен"
                }
            }
        ],
        id: 1,
        type: "likert"
    }
    const [ test, setTest ] = useState(testData);

    const handleResponse = (itemId, response) => {
        setTest({
            ...test,
            items: test.items.map(item => {
                return item.id === itemId ? {...item, response: response} : {...item}
            })
        });
    }
    
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
