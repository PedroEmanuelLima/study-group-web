import { useState, useContext } from 'react';
import Head from 'next/head';

import Header from '../../components/Header';
import styles from '../../styles/New.module.css';
import { AuthContext } from '../../contexts/auth';
import IGroup from '../../interfaces/IGroup';
import Alerta from '../../components/Alerta';
import Load from '../../components/Load';

interface IDias {
  value: string
}

const dias: IDias[] = [
  { value: "DOMINGO" },
  { value: "SEGUNDA-FEIRA" },
  { value: "TERÇA-FEIRA" },
  { value: "QUARTA-FEIRA" },
  { value: "QUINTA-FEIRA" },
  { value: "SEXTA-FEIRA" },
  { value: "SABADO" },
]

export default function NewGroup() {

  const { createGroup, alerta, usuario } = useContext(AuthContext);

  const [grupo, setGrupo] = useState<Omit<IGroup, "_id">>({
    meta: '',
    descricao: '',
    dia: ''
  });

  const criarGrupo = (e: any) => {
    e.preventDefault();
    createGroup(grupo);
  }
  return (
    <>
      <Head>
        <title>New Group</title>
      </Head>
      {!usuario && 
        <div className={styles.loadUser}>
          <Load />
        </div>
      }
      {usuario &&
        <>
          <Header />
          {alerta.alert && <Alerta message={alerta.message} type={alerta.type}/>}
          <div className={styles.container}>
            <main className={styles.main}>
            <form className={styles.form} >
                  <div className={styles.contentForm}>                        
                      <div className={styles.inputGroup} >
                          <input
                            className={styles.inputTag}
                            placeholder='META DO GRUPO'
                            value={grupo?.meta}
                            onChange={e => setGrupo(prevState => {
                              return { ...prevState, meta: e.target.value }
                            })}
                          />
                      </div>
                      
                      <div className={styles.inputGroup} >
                        <select
                          className={styles.inputTag}
                          value={grupo.dia}
                          onChange={e => setGrupo(prevState => {
                            return { ...prevState, dia: e.target.value }
                          })}
                          required
                        >
                          <option value="" disabled>DIA DE ENCONTRO</option>
                          {dias.map((d, i) => (
                            <option key={i} className={styles.optionsDia} value={d.value}>{d.value}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className={styles.inputGroup} >
                          <textarea
                            rows={8}
                            value={grupo?.descricao}
                            className={styles.inputTag}
                            placeholder='DESCRIÇÃO DO GRUPO'
                            onChange={e => setGrupo(prevState => {
                              return { ...prevState, descricao: e.target.value }
                            })}
                          />
                      </div>
                  </div>
                  <button
                    type='submit'
                    className={styles.btnCriar}
                    onClick={criarGrupo}
                  >
                    Criar
                  </button>
              </form>
            </main>
          </div>
        </>
      }
    </>
  )
}
