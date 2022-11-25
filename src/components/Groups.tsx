import { FunctionComponent, useContext } from 'react';
import { useRouter } from 'next/router';

import IGroup from '../interfaces/IGroup';
import styles from '../styles/Components.module.css';
import { AuthContext } from '../contexts/auth';

interface IGruposAndSerch {
    isPesquisa: boolean;
    grupo: IGroup
}

const Groups: FunctionComponent<IGruposAndSerch> = ({grupo, isPesquisa}) => {

    const { joinGroup, usuario } = useContext(AuthContext);
    const rota = useRouter();

    const entrar = () => {
        joinGroup(usuario?._id, grupo._id);
    }

    if (!isPesquisa) {
        
        const openGroup = () => {
            rota.push(`/grupo/${grupo._id}`)
        }

        return(
            <button className={styles.btnCardGroup} onClick={openGroup}>
                <div className={styles.cardMyGroup}>
                    <div className={styles.startGroup}>
                        <h1 className={styles.titleGroup}>{grupo.meta}</h1>
                        <span className={styles.dia}>{grupo.dia}</span>
                    </div>
                    <p className={styles.descriptionGroup}>{grupo.descricao}</p>
                </div>
            </button>
        )
    }
    return(
        <div className={styles.cardGroup}>
            <div className={styles.startGroup}>
                <h1 className={styles.titleGroup}>{grupo.meta}</h1>
                <span className={styles.dia}>{grupo.dia}</span>
            </div>
            <p className={styles.descriptionGroup}>{grupo.descricao}</p>
            <div className={styles.btnContent}>
                <button onClick={e => entrar()} className={styles.btnEntrarGroup}>Entrar</button>
            </div>
        </div>
    )
}

export default Groups;