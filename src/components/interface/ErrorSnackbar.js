import React from 'react'
import { Snackbar } from '@vkontakte/vkui';

export default function ErrorSnackbar(props) {
    const { onClose, error } = props;
    return (
        <Snackbar
                layout="vertical"
                onClose={ onClose }
            >
                <p>{ error ? error.toString() : "Everything is OK" }</p>
        </Snackbar>
    )
}


