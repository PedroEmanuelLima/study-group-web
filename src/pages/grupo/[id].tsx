import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MdArrowBackIosNew, MdOutlineAttachment } from 'react-icons/md';
import { useRouter } from 'next/router';

import IGroup from '../../interfaces/IGroup';
import { IDocumento } from '../../interfaces/IDocumento';
import Load from '../../components/Load';
import styles from '../../styles/Group.module.css';
import { AuthContext } from '../../contexts/auth';
import Documento from '../../components/Documento';
import Alerta from '../../components/Alerta';
import ConfirmSubmit from '../../components/ConfirmSubmit';
import ConfigGroup from '../../components/ConfigGroup';

export default function GetGroup() {
    
    const rota = useRouter();
    const id = rota.query.id;
    
    const { api, alertar, alerta, usuario } = useContext(AuthContext);

    const [configGrupo, setConfigGrupo] = useState<boolean>(false);
    const [grupo, setGrupo] = useState<IGroup | null>(null);
    const [documentos, setDocumentos] = useState<IDocumento[]>([]);
    const [grupoCarregado, setGrupoCarregado] = useState<boolean>(false);
    const [carregado, setCarregado] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (id && usuario) {
            api.get(`grupo/${id}`)
            .then((res: any) => {
                setGrupo(res.data)
                setGrupoCarregado(true);
            })
            .catch((err: any) => {
                alertar("Grupo Inacessiél", 1500, "error");
                rota.push('/');
            });
            api.get(`documento/${id}`)
                .then((res: any) => {
                    setDocumentos(res.data)
                    setCarregado(true);
                });
        }

    }, [id]);

    return(
        <>
            <Head>
                <title>{grupo?.meta}</title>
            </Head>

            {!usuario && 
                <div className={styles.loadUser}>
                <Load />
                </div>
            }
            
            {usuario &&
            <>
                {alerta.alert && <Alerta message={alerta.message} type={alerta.type} />}
                <ConfirmSubmit
                    setDocumentos={setDocumentos}
                    grupo={id?.toString()}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                />
                <ConfigGroup grupo={grupo} modalOpen={configGrupo} setModalOpen={setConfigGrupo} />
                {grupoCarregado?
                    grupo &&
                    <>
                        <div className={styles.container}>
                            <div className={styles.groupHeader}>
                                <Link href='/' className={styles.groupBtn}>
                                    <MdArrowBackIosNew size={60}/>
                                </Link>
                                <button onClick={e => setConfigGrupo(true)} className={styles.groupBtnHeader}>
                                    <h1>{grupo.meta}</h1>
                                    <p>{grupo.dia}</p>
                                </button>
                                <button
                                    onClick={e => setModalOpen(true)}
                                    className={styles.anexar}
                                >
                                    <MdOutlineAttachment size={70}/>
                                </button>
                            </div>
                            {documentos.length ?
                                (<main className={styles.main}>
                                    {documentos.map((doc) => (
                                        <Documento
                                            key={doc._id}
                                            _id={doc._id}
                                            secure_url={doc.secure_url}
                                            descricao={doc.descricao}
                                        />
                                    ))}
                                </main>):
                                <div className={styles.notFoundDocs}>
                                    {carregado ?
                                        <div className={styles.contentAddDoc}>
                                            <button
                                                onClick={e => setModalOpen(true)}
                                                className={styles.anexar}
                                            >
                                                <MdOutlineAttachment size={70}/>
                                            </button>
                                            <p>Adicione um documento</p>
                                            <h1>Nenhum Documento Encontrado</h1>
                                        </div>:
                                        <Load />
                                    }
                                </div>
                            }
                        </div>
                    </>:
                    <div className={styles.loadGroup}>
                        <Load />
                    </div>
                }
            </>}
        </>
    )

}