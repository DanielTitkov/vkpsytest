import React from 'react';
import { Cell } from '@vkontakte/vkui';
import { setActiveTest } from '../../store/actions/testActions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
		setActiveTest: (test) => dispatch(setActiveTest(test))
    }
}

function TestSnippet(props) {
    const { test, go, setActiveTest } = props;
    return (
        <Cell 
            description={ "Количество пунктов: " + test.items.length }
            expandable onClick={ (e) => {setActiveTest(test); go(e);}  } 
            data-to="testdetails" 
            indicator="Подробнее"
        >
            <p className="test-snippet-title">{ test.title }</p>
            <p className="test-snippet-desc">{ test.desc } </p>
        </Cell>
    )
}

export default connect(null, mapDispatchToProps) (TestSnippet);