import React from 'react';
import { Slider } from '@vkontakte/vkui';
import './TestItemLikert.css';

export default function TestItemLikert(props) {
    const { item, handleResponse } = props;
    return (
        <div className="itemWrapper" id={item.id}>
            <h3>{ item.content }</h3>
            <i className="scaleLabel">&larr; { item.scale.minLabel } / { item.scale.maxLabel } &rarr;</i>
            <Slider
                step={1}
                min={item.scale.min}
                max={item.scale.max}
                // value={Number(this.state.value2)}
                onChange={value => {handleResponse(item.id, value)}}
            />
            <b>Response: { props.response[0].response }</b>
        </div>
    )
}
