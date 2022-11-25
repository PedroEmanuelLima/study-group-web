import { config } from 'process';
import React, { useContext, useState } from 'react';
import { FunctionComponent, MouseEvent } from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';

import { AuthContext } from '../contexts/auth';
import styles from '../styles/Components.module.css';
import ModifyPassOrImage from './ModifyPassOrImage';

interface IModal {
    visible: boolean;
    modal: Function;
}

interface IConfig {open: boolean, config: 'PASS' | 'IMAGE' }

const ModalProfile: FunctionComponent<IModal> = ({ visible, modal }) => {

    const { signOut } = useContext(AuthContext);

    const [openConfig, setOpenconfig] = useState<IConfig>({
        open: false,
        config: 'IMAGE'
    })

    const closeModal = () => {
        modal()
    }

    const abrirConfiguracoes = ({config}: Pick<IConfig, 'config'>) => {
        setOpenconfig({open: true, config: config});
    }

    const fecharConfiuracoes = () => {
        setOpenconfig({open: false, config: 'IMAGE'});
    }

    return(
        <>
            <Modal
                ariaHideApp={false}
                isOpen={visible}
                onRequestClose={closeModal}
                className={styles.modalProfile}
                overlayClassName={styles.backModalFile}
            >
                <>
                    <div className={styles.onClosed}>
                        <button onClick={closeModal} className={styles.btnCloseModal}>
                            <MdClose size={30}/>
                        </button>
                    </div>
                    <button
                        className={styles.btnModal}
                        onClick={e => {
                            abrirConfiguracoes({config: 'IMAGE'});
                            closeModal();
                        }}
                    > Mudar Image Perfil</button>
                    <button
                        className={styles.btnModal}
                        onClick={e => {
                            abrirConfiguracoes({config: 'PASS'});
                            closeModal();
                        }}
                    > Mudar Senha</button>
                    <button className={styles.btnModal} onClick={signOut}>Sair</button>
                </>
            </Modal>
            <ModifyPassOrImage visible={openConfig.open} closeConfig={fecharConfiuracoes} req={openConfig.config} />
        </>
    ) 
}



export default ModalProfile;