import React from 'react';
import { Slider } from '@vkontakte/vkui';
import './TestItemLikert.css';
import { updateActiveTestResponse } from '../../store/actions/testActions';
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveTestResponse: (response) => dispatch(updateActiveTestResponse(response))
    }
}

function TestItemLikert(props) {
    const { item, updateActiveTestResponse } = props;
    return (
        <div className="itemWrapper" id={item.id}>
            <h3>{ item.content }</h3>
            <i className="scaleLabel">&larr; { item.scale.minLabel } / { item.scale.maxLabel } &rarr;</i>
            <Slider
                step={1}
                min={item.scale.min}
                max={item.scale.max}
                value={Number(item.response)}
                onChange={ value => {updateActiveTestResponse({itemId: item.id, value: value})} }
            />
            <b>Response: { item.response }</b>
        </div>
    )
}

export default connect(null, mapDispatchToProps) (TestItemLikert);
