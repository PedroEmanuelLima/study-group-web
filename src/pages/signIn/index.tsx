import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { 
    MdOutlinePersonOutline, 
    MdLockOutline, 
    MdOutlineAutoStories,
    MdRemoveRedEye
} from "react-icons/md";
import validator from "validator";
import Alert from '@mui/material/Alert';

import Alerta from '../../components/Alerta';
import { AuthContext } from "../../contexts/auth";
import { schema } from '../../config/index'
import styles from '../../styles/Login.module.css';


export default function Login() {

    
    const { signIn, alerta, reset } = useContext(AuthContext);
    const [click, setClick] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [seePass, setSeePass] = useState(false);
    const [senhReiniciada, setSenhaReiniciada] = useState({reset: false, message: ''});

    useEffect(() => {
        function verificar(){
            if (!validator.isEmail(email)) {
                setClick(true);
                return;
            }
    
            if (!schema.validate(senha)) {
                setClick(true);
                return;
            }
    
            setClick(false);
        }
        
        verificar();
    }, [email, senha]);

    const entrar = (e: any) => {
        e.preventDefault();
        signIn(email, senha);
    }
    
    const recuperar = async (e: any) => {
        e.preventDefault();
        await reset(email);
    }

    return(
        <>
            <Head>
                <title>Login Study-Group</title>
            </Head>
            {alerta.alert && <Alerta message={alerta.message} type={alerta.type}/>}

            <div className={styles.container}>
                <main className={styles.main}>
                    <MdOutlineAutoStories size={120} />

                    <form className={styles.form} >
                        <div className={styles.inputs}>
                            <div className={styles.inputGroup} >
                                <label className={styles.labelInput} htmlFor="email">
                                    <MdOutlinePersonOutline size={'100%'}/>
                                </label>
                                <input
                                    name="email" id="email"
                                    className={styles.inputTag}
                                    placeholder='EMAIL'
                                    type={'email'}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                
                            </div>

                            <div className={styles.inputGroup} >
                                <label className={styles.labelInput} htmlFor="senha">
                                    <MdLockOutline size={'100%'}/>
                                </label>
                                <input
                                    name="senha" id="senha"
                                    className={styles.inputTag}
                                    placeholder='SENHA'
                                    type={seePass ? 'text' : 'password'}
                                    value={senha}
                                    
                                    onChange={e => setSenha(e.target.value)}
                                />
                                <span className={styles.btnEye} onClick={e => {
                                    e.preventDefault();
                                    setSeePass(!seePass)
                                }}>
                                    <MdRemoveRedEye size={'100%'}/>
                                </span>
                            </div>
                        </div>
                        
                        <div className={styles.optionsLog}>
                            <button
                                className={styles.btnEntrar}
                                type="submit" onClick={e => entrar(e)}
                                disabled={click}
                            >Entrar</button>
                            <div className={styles.divBtnSenha} >
                            <button
                                className={styles.btnSenha}
                                onClick={e => recuperar(e)}
                            >
                                Recuperar Senha.
                            </button>
                            </div>
                        </div>
                    </form>

                    <Link href='/signUp'>
                        <button className={styles.btnCadastrar}>Cadastrar-se</button>
                    </Link>
                </main>
            </div>
        </>
    )
}