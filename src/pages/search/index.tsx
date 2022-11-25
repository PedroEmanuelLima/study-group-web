import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';

import Groups from '../../components/Groups';
import Search from '../../components/Search';
import Header from '../../components/Header';
import IGroup from '../../interfaces/IGroup';
import styles from '../../styles/Search.module.css';
import Load from '../../components/Load';
import { AuthContext } from '../../contexts/auth';

export default function GroupsToJoin() {

  const { api, usuario, alertar } = useContext(AuthContext);
  const [grupos,setGrupos] = useState<IGroup[]>([]);
  const [gruposAux,setGruposAux] = useState<IGroup[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (usuario) {
      api.get(`grupo/all/${usuario._id}`).then((resp: any) => {
        setGrupos(resp.data);
        setGruposAux(resp.data);
        setCarregado(true);
      }).catch((err: any) => {
        alertar(err.response.data.message, 1500, "error");
        setCarregado(true);
      })
    }
  }, [usuario]);

  useEffect(() => {
    if(grupos.length) console.log(grupos);
  }, [grupos])
  
  useEffect(() => {
    function filtrar() {
      setGrupos(gruposAux.filter(g =>{
        return (
          g.meta.toLowerCase().includes(pesquisa.toLowerCase()) ||
          g.dia.toLowerCase().includes(pesquisa.toLowerCase()) ||
          g.descricao.toLowerCase().includes(pesquisa.toLowerCase())
        )
      }))
    }

    if (pesquisa.trim()) filtrar();
    else setGrupos(gruposAux);
  }, [pesquisa])

  return (
    <>
      <Head>
        <title>All Groups</title>
      </Head>
      {!usuario && 
        <div className={styles.loadMyGroups}>
          {(carregado ? <h1>Nenhum Grupo Encontrado</h1> : <Load />)}
        </div>
      }
      {usuario && 
        <>
          <Header />
          <div className={styles.container}>
            {grupos.length ?
              <main className={styles.main}>
                <Search setPesquisa={setPesquisa} />
                {grupos.map((grupo) => 
                  <Groups grupo={grupo} isPesquisa={true} key={grupo._id}/>
                )}
              </main>:
              <div className={styles.loadMyGroups}>
                {(carregado ? <h1>Nenhum Grupo Encontrado</h1> : <Load />)}
              </div>
            }
          </div>
        </>
      }
    </>
  )
}
