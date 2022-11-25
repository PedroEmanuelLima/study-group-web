import React, { FunctionComponent } from 'react';
import Alert from '@mui/material/Alert';
import IMessage from '../interfaces/IMessage';

import styles from '../styles/Components.module.css'

const Alerta: FunctionComponent<Omit<IMessage, 'alert'>> = ({ message, type }) => {
    return (
        <div className={styles.alertContainer}>
            <Alert
                variant="filled"
                severity={type}
                className={styles.alert}
            >
                {message}
            </Alert>
        </div>
    )
};

export default Alerta;