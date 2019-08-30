import React from 'react'

export default function TestItemLikert(props) {
    const { item, handleResponse } = props;
    return (
        <div id={item.id}>
            { item.content }
        </div>
    )
}
