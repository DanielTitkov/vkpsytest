import React from 'react';
import { Slider } from '@vkontakte/vkui';
import './InventoryItemLikert.css';
import { updateActiveInventoryResponse } from '../../store/actions/inventoryActions';
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveInventoryResponse: (response) => dispatch(updateActiveInventoryResponse(response))
    }
}

function InventoryItemLikert(props) {
    const { item, updateActiveInventoryResponse } = props;
    return (
        <div className="itemWrapper" id={item.id}>
            <h3>{ item.content }</h3>
            <i className="scaleLabel">&larr; { item.scale.minLabel } / { item.scale.maxLabel } &rarr;</i>
            <Slider
                step={1}
                min={item.scale.min}
                max={item.scale.max}
                value={Number(item.response)}
                onChange={ value => {updateActiveInventoryResponse({itemId: item.id, value: value})} }
            />
            <b>Response: { item.response }</b>
        </div>
    )
}

export default connect(null, mapDispatchToProps) (InventoryItemLikert);
