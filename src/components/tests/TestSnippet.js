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
        <Cell description={ test.desc } expandable onClick={ (e) => {setActiveTest(test); go(e);}  } data-to="testplayer" indicator="Подробнее">
            { test.title }
        </Cell>
    )
}

export default connect(null, mapDispatchToProps) (TestSnippet);