import React, { useContext, useState, FunctionComponent, useEffect } from 'react';
import Image from 'next/image';
import { MdAccountCircle, MdClose } from 'react-icons/md';
import Modal from 'react-modal';

import Alerta from '../components/Alerta'
import { AuthContext } from '../contexts/auth';
import { schema } from '../config/index';
import styles from '../styles/Components.module.css';

interface IModal {
    visible: boolean;
    closeConfig: Function;
    req: "IMAGE" | "PASS";
}

const ModifyPassOrImage: FunctionComponent<IModal> = ({ visible, closeConfig, req }) => {

    const { modifyImage, modifyPassword, alerta, alertar } = useContext(AuthContext);
    const [confirme, setConfirme] = useState(false);
    const [confirmeImage, setConfirmeImage] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [urlFile, setUrlFile] = useState('');

    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [repetNovaSenha, setRepetNovaSenha] = useState('');

    useEffect(() => {
        function verificar(){
            if (!schema.validate(senhaAtual)) {
                setConfirme(true);
                return;
            }
    
            if (!schema.validate(novaSenha)) {
                setConfirme(true);
                return;
            }

            if (!schema.validate(repetNovaSenha)) {
                setConfirme(true);
                return;
            }
    
            setConfirme(false);
        }
        
        verificar();
    }, [senhaAtual, novaSenha, repetNovaSenha]);
    
    useEffect(() => {
        function verificar(){
            if (!selectedFile) {
                setConfirmeImage(true);
                return;
            }
    
            setConfirmeImage(false);
        }
        
        verificar();
    }, [selectedFile]);

    const closeModal = () => {
        if (req == 'PASS') {
            setSenhaAtual('');
            setNovaSenha('');
            setRepetNovaSenha('');
        } else {
            setSelectedFile(null);
            setUrlFile('');
        }
        closeConfig(false);
    }

    const handleSelectImage = (e: any) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
        const urlI = URL.createObjectURL(e.target.files[0]);
        setUrlFile(urlI);
    }

    const modificarImagem = (e: any) => {
        e.preventDefault();
        modifyImage(selectedFile);
        closeModal();
    }
    
    const modificarSenha = (e: any) => {
        e.preventDefault();
        if (novaSenha != repetNovaSenha) {
            alertar("Senha e Confirmar nova senha devem ser Iguais", 2000, 'error')
            return;
        }
        modifyPassword(senhaAtual, novaSenha);
    }

    return(
        <Modal
            ariaHideApp={false}
            isOpen={visible}
            onRequestClose={closeModal}
            className={styles.modalModify}
            overlayClassName={styles.backModalFile}
        >
            { req == "PASS" &&
                <>
                    <h3 className={styles.infoNewPass}>
                        A senha deve ter no minimo 8 caracteres e conter letras Minúsculas e Maiúsculas
                    </h3>
                    {alerta.alert && <Alerta message={alerta.message} type={alerta.type}/>}
                    <div className={styles.onClosedConfig}>
                        <button onClick={closeModal} className={styles.btnCloseConfig}>
                            <MdClose size={30} color={'#4A21C0'}/>
                        </button>
                    </div>
                    <form className={styles.formModify}>
                        <div className={styles.inputsGroupModifyPass}>
                            <input
                                className={styles.inputModifyPass}
                                placeholder='SENHA ATUAL' 
                                type={'password'}
                                value={senhaAtual}
                                onChange={e => setSenhaAtual(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputsGroupModifyPass}>
                            <input
                                className={styles.inputModifyPass}
                                placeholder='NOVA SENHA' 
                                type={'password'}
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputsGroupModifyPass}>
                            <input
                                className={styles.inputModifyPass}
                                placeholder='CONFIRMAR NOVA SENHA'
                                type={'password'}
                                value={repetNovaSenha}
                                onChange={e => setRepetNovaSenha(e.target.value)}
                            />
                        </div>                    
                        
                        <div className={styles.btnGoupConfig}>
                            <button
                                onClick={e => modificarSenha(e)}
                                disabled={confirme}
                                className={styles.btnConfig}
                            >Confirmar</button>
                            <button
                                onClick={e => closeModal()}
                                className={styles.btnConfig}
                            >Cancelar</button>
                        </div>
                    </form>
                </>
            }

            { req == "IMAGE" &&
                <>
                <div className={styles.onClosedConfig}>
                    <button onClick={closeModal} className={styles.btnCloseConfig}>
                        <MdClose size={30} color={'#4A21C0'}/>
                    </button>
                </div>
                <form className={styles.formModify}>
                    <div className={styles.imageModify}>
                        <div className={styles.imageContenteModify}>
                            <label htmlFor="arquivo" className={styles.labelInputFile}>
                                {urlFile.trim().length ?
                                    <Image
                                        className={styles.modifyImageProfile}
                                        src={urlFile} alt="Imagem de Perfil"
                                        width={85} height={85}
                                    />:
                                    <MdAccountCircle color='#4A21C0' size={'100%'}/>
                                }
                            </label>
                            <input
                                className={styles.inputFile}
                                onChange={handleSelectImage}
                                type="file" accept="image/*"
                                name="arquivo" id="arquivo"
                            />
                        </div>
                    </div>

                    {/* <button
                        className={styles.btnRemoveImage}
                        disabled={usuario?.resource ? true : false }
                    >Remover Imagem</button> */}
                    
                    <div className={styles.btnGoupConfig}>
                        <button
                            onClick={e => modificarImagem(e)}
                            disabled={confirmeImage}
                            className={styles.btnConfig}
                        >Confirmar</button>
                        <button
                            onClick={e => closeModal()}
                            className={styles.btnConfig}
                        >Cancelar</button>
                    </div>
                </form>
                </>
            }
        </Modal>
    ) 
}



export default ModifyPassOrImage;