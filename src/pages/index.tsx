import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import Header from '../components/Header';
import Search from '../components/Search';
import Groups from '../components/Groups';
import IGroup from '../interfaces/IGroup';
import Load from '../components/Load';
import { AuthContext } from '../contexts/auth';
import styles from '../styles/Home.module.css';

interface IGrupos {
  grupo: IGroup
}



const Home = () => {

  const { load, api, usuario, alertar } = useContext(AuthContext);
  const [grupos,setGrupos] = useState<IGrupos[]>([]);
  const [gruposAux,setGruposAux] = useState<IGrupos[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (usuario) {
      api.get(`grupo/my/${usuario._id}`).then((resp: any) => {
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
    function filtrar() {
      setGrupos(gruposAux.filter(g =>{
        return (
          g.grupo.meta.toLowerCase().includes(pesquisa.toLowerCase()) ||
          g.grupo.dia.toLowerCase().includes(pesquisa.toLowerCase()) ||
          g.grupo.descricao.toLowerCase().includes(pesquisa.toLowerCase())
        )
      }))
    }

    if (pesquisa.trim()) filtrar();
    else setGrupos(gruposAux);
  }, [pesquisa])

  return (
    <>
      <Head>
        <title>My-Groups</title>
      </Head>
      {load ?
        <>
          {carregado && <Header />}
          <div className={styles.container}>
            {grupos.length ?
              <main className={styles.main}>
                <Search setPesquisa={setPesquisa} />
                {grupos.map((grupo) => 
                  <Groups grupo={grupo.grupo} isPesquisa={false} key={grupo.grupo._id}/>
                )}
              </main>:
              <div className={styles.loadMyGroups}>
                {(carregado ? <h1>Nenhum Grupo Encontrado</h1> : <Load />)}
              </div>
            }
          </div>
        </>:
        <div className={styles.loadMyGroups}><Load /></div>
      }
    </>
  )
};

export default Home;