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
    const { question, response, updateActiveInventoryResponse } = props;
    return (
        <div className="itemWrapper" id={question.id}>
            <h3>{ question.item.content }</h3>
            <i className="scaleLabel">&larr; { question.display_options.minLabel } / { question.display_options.maxLabel } &rarr;</i>
            <Slider
                step={1}
                min={question.display_options.min}
                max={question.display_options.max}
                value={Number(response)}
                onChange={ value => {updateActiveInventoryResponse({
                    itemId: question.item.id, 
                    questionId: question.id,
                    value: value
                })} }
            />
            <b>Response: { response }</b>
        </div>
    )
}

export default connect(null, mapDispatchToProps) (InventoryItemLikert);
