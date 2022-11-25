import React, { useContext, FunctionComponent } from 'react';
import Modal from 'react-modal';

import styles from '../styles/Components.module.css';
import { AuthContext } from '../contexts/auth';
import IGroup from '../interfaces/IGroup';

interface IModalSubmit {
    modalOpen: boolean,
    setModalOpen: Function,
    grupo: IGroup | null
}

const ConfigGroup: FunctionComponent<IModalSubmit> = ({modalOpen, setModalOpen,
    grupo}) => {

    const { leaveGroup, usuario } = useContext(AuthContext);

    const closeModal = () => {
        setModalOpen(false);
    };

    const sair = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        leaveGroup(usuario!._id, grupo!._id);
        closeModal()
    }

    return(
        <Modal
            ariaHideApp={false}
            isOpen={modalOpen}
            onAfterClose={closeModal}
            onRequestClose={closeModal}
            className={styles.modalFile}
            overlayClassName={styles.backModalFile}
        >
            <div className={styles.contentForm}>
                <h1>{grupo?.meta}</h1>
                <p>Dia de Encontro: {grupo?.dia}</p>
                
                <div>
                    <p>{grupo?.descricao}</p>
                </div>
                <div className={styles.opcoesModal}>
                    <button
                        onClick={e => sair(e)}
                        className={styles.btnCancel}>Sair desse grupo</button>
                    <button
                        onClick={e => closeModal()}
                        className={styles.btnSubmit}
                    >Fechar</button>
                </div>
            </div>
        </Modal>
    )
};

export default ConfigGroup;