import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';


import ImageProfile from '../../components/ImageProfile';
import styles from '../../styles/Create.module.css';
import { AuthContext } from '../../contexts/auth';
import INewUser from '../../interfaces/INewUser';
import Alerta from '../../components/Alerta';

export default function Cadastrar() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState<INewUser>({
        nome: "",
        email: "",
        senha: "",
        confirmeSenha: "",
    });
    
    const { create, alerta } = useContext(AuthContext);

    const cadastrar = (e: any) => {
        e.preventDefault();
        create(user);
    }

    useEffect(() => {
        if (selectedFile) {
            setUser(prevState => {
                return { ...prevState, image: selectedFile }
            });
        }
    }, [selectedFile])

    return(
        <>
            <Head>
                <title>Create Account Study-Group</title>
            </Head>
            {alerta.alert && <Alerta message={alerta.message} type={alerta.type}/>}
            <div className={styles.container}>
                <main className={styles.main}>
                    <form className={styles.form} >
                        <div className={styles.contentForm}>
                            <ImageProfile
                                selectedFile={selectedFile}
                                onFileSelect={(file: any) => setSelectedFile(file)}
                            />
                            
                            <div className={styles.inputGroup} >
                                <input
                                    className={styles.inputTag}
                                    placeholder='NOME DE USUÁRIO' 
                                    onChange={e => setUser(prevState => {
                                        return { ...prevState, nome: e.target.value }
                                    })}
                                />
                            </div>
                            
                            <div className={styles.inputGroup} >
                                <input
                                    className={styles.inputTag}
                                    placeholder='EMAIL' 
                                    onChange={e => setUser(prevState => {
                                        return { ...prevState, email: e.target.value }
                                    })}
                                />
                            </div>
                            
                            <div className={styles.inputGroup} >
                                <input
                                    className={styles.inputTag}
                                    placeholder='SENHA'
                                    type={'password'}
                                    onChange={e => setUser(prevState => {
                                        return { ...prevState, senha: e.target.value }
                                    })}
                                />
                            </div>
                            
                            <div className={styles.inputGroup} >
                                <input
                                    className={styles.inputTag}
                                    placeholder='CONFIRMAR SENHA' 
                                    type={'password'}
                                    onChange={e => setUser(prevState => {
                                        return { ...prevState, confirmeSenha: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                        <button type='submit' className={styles.btnCadastrar} onClick={cadastrar}>Cadastrar</button>
                        <Link href="/signIn">
                            <button className={styles.btnCancelar}>Cancelar</button>
                        </Link>
                    </form>
                </main>
            </div>
        </>
    )
}