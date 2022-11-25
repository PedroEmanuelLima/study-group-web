import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import Modal from 'react-modal';
import { IUploadDoc } from '../interfaces/IDocumento';
import SubmitDocument from './SubmitDocument';

import styles from '../styles/Components.module.css';
import { AuthContext } from '../contexts/auth';

interface IModalSubmit {
    modalOpen: boolean,
    setModalOpen: Function,
    grupo: string | undefined,
    setDocumentos: Function
}

const ConfirmSubmit: FunctionComponent<IModalSubmit> = ({modalOpen, setModalOpen,
    grupo, setDocumentos}) => {

    const { sendDoc, alertar } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [documento, setDocumento] = useState<IUploadDoc>({
        descricao: '',
        documento: null
    });

    useEffect(() => {
        if (selectedFile) {
            setDocumento(prevState => {
                return {...prevState, documento: selectedFile}
            })
        }
    }, [selectedFile])
    
    const closeModal = () => {
        setModalOpen(false);
        setSelectedFile(null);
        setDocumento({descricao: '', documento: null});
    };

    const submitDoc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!(documento.documento?.type == 'application/pdf') || documento == null){
            alertar("PDF não identificado", 2000, "error");
            closeModal();
            return;
        }
        if(documento.descricao.trim() == ''){
            alertar("Preencha a descrição", 2000, "error");
            closeModal();
            return;
        }
        const submeido = sendDoc(documento, grupo, setDocumentos);
        closeModal();
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
                <div className={styles.uploadPdf}>
                    <SubmitDocument
                        selectedFile={selectedFile}
                        onFileSelect={(file: any) => setSelectedFile(file)}
                    />
                    <span className={styles.fileName}>
                        {documento.documento?.name || "Anexar seu arquivo PDF"}
                    </span>
                </div>
                
                <div className={styles.inputDescricaoDoc} >
                    <input
                        className={styles.inputTag}
                        placeholder='Descrção do documento' 
                        onChange={e => setDocumento(prevState => {
                            return { ...prevState, descricao: e.target.value }
                        })}
                    />
                </div>
                <div className={styles.opcoesModal}>
                    <button
                        onClick={e => submitDoc(e)}
                        className={styles.btnSubmit}>Enviar</button>
                    <button
                        onClick={e => closeModal()}
                        className={styles.btnCancel}
                    >Cancelar</button>
                </div>
            </div>
        </Modal>
    )
};

export default ConfirmSubmit;