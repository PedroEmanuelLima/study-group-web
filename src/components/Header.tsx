import { useState, useContext, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdAccountCircle } from "react-icons/md";

import { AuthContext } from '../contexts/auth';
import styles from '../styles/Components.module.css';
import ModalProfile from './ModalProfile';


const Header = () => {

    const [visible, setVisible] = useState(false);
    const rota = useRouter();
    const path = rota.asPath;
    const { usuario } = useContext(AuthContext);

    return(
        <>
            <nav className={styles.headerContainer}>
                <button className={styles.btnProfile} onClick={e => setVisible(true)}>
                    {usuario?.resource ?
                        <Image
                            className={styles.imageProfile}
                            src={usuario.resource.secure_url} alt="Imagem de Perfil"
                            fill
                        />:
                        <MdAccountCircle size={60}/>
                    }
                </button>

                <ul className={styles.listaDeLinks}>
                    <li>
                        <Link href="/">
                            <div className={styles.linkContainer}>
                                <span className={styles.links}>MEUS GRUPOS</span>
                                {path == '/' && <span className={styles.isPath}></span>}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="new">
                            <div className={styles.linkContainer}>
                                <span className={styles.links}>CRIAR GRUPO</span>
                                {path == '/new' && <span className={styles.isPath}></span>}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="search">
                            <div className={styles.linkContainer}>
                                <span className={styles.links}>PESQUISAR GRUPOS DISPONIVEIS</span>
                                {path == '/search' && <span className={styles.isPath}></span>}
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
            <ModalProfile visible={visible} modal={setVisible}/>

        </>
    )
}

export default Header;