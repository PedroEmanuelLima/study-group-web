import { FunctionComponent } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';

import { IDocumento } from '../interfaces/IDocumento';
import styles from '../styles/Group.module.css';


const Documento: FunctionComponent<Omit<IDocumento, '_id' | 'cloudinary_id' | 'grupo'>> = ({descricao, secure_url}) => {

    return(
        <>
            <div className={styles.docCard}>
                <p className={styles.docCardTitle}>{descricao}</p>
                <div className={styles.docOptions}>
                    <a
                        className={styles.groupBtn}
                        href={secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MdRemoveRedEye size={40}/>
                    </a>
                </div>
            </div>
        </>
    )
};

export default Documento;