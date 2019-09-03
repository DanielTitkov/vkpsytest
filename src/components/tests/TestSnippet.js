import React from 'react';
import { Cell, Alert } from '@vkontakte/vkui';
import { setActiveTest } from '../../store/actions/testActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		activeTest: state.test.activeTest
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		setActiveTest: (test) => dispatch(setActiveTest(test))
    }
}

function TestSnippet(props) {
    const { test, go, setActiveTest, activeTest, openPopout, closePopout } = props;
    const popout = <Alert
        actions={[
            {
                title: 'Отмена',
                autoclose: true,
                style: 'cancel'
            },
            {
                title: 'Открыть!',
                autoclose: true,
                action: () => {setActiveTest(test); go({currentTarget: {dataset: {to: "testdetails"}}});},
            }
        ]}
        onClose={closePopout}
    >
        <h2>Подтвердите действие</h2>
        <p>У вас уже открыт другой тест. Если сейчас откроете новый, то ответы в старом не сохранятся. Открыть?</p>
    </Alert>

    return (
        <Cell 
            description={ "Количество пунктов: " + test.items.length }
            expandable onClick={ 
                activeTest && activeTest.id !== test.id ? (
                    () => openPopout(popout)
                ) : (
                    (e) => {setActiveTest(test); go(e);}
                )
            } 
            data-to="testdetails" 
            indicator="Подробнее"
        >
            <p className="test-snippet-title">{ test.title }</p>
            <p className="test-snippet-desc">{ test.desc } </p>
        </Cell>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (TestSnippet);