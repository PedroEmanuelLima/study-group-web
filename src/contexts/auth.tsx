import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import validator from "validator";

import { schema } from '../config/index';
import IUser from "../interfaces/IUser";
import { api } from "../config";
import IMessage from "../interfaces/IMessage";
import INewUser from "../interfaces/INewUser";
import IGroup from "../interfaces/IGroup";
import { AlertColor } from "@mui/material";
import { IUploadDoc } from "../interfaces/IDocumento";

interface props {
    children: JSX.Element | JSX.Element[]
}

interface IContext {
    api: any,
    usuario: IUser | null,
    signIn(email: string, senha: string): void,
    signOut(): void,
    alerta: IMessage,
    load: boolean,
    create(estudante: INewUser): void,
    reset(email: string): IMessage | any,
    alertar(aviso: string, tempo: number, tipo: AlertColor | undefined): void,
    createGroup(group: Omit<IGroup, '_id'>): void,
    sendDoc: Function,
    joinGroup: Function,
    leaveGroup: Function,
    modifyPassword: Function,
    modifyImage: Function,
}

export const AuthContext = createContext<IContext>({
    api: null,
    signIn(){},
    signOut(){},
    reset(){},
    usuario: null,
    alerta: {
        alert: false,
        message: "",
        type: undefined
    },
    load: false,
    create(){},
    alertar(){},
    createGroup(){},
    sendDoc(){},
    joinGroup(){},
    leaveGroup(){},
    modifyPassword(){},
    modifyImage(){},
});

const AuthProvider = ({ children }: props) => {
    
    const [load, setLoad] = useState<boolean>(false)
    const [usuario, setUsuario] = useState<IUser | null>(null);
    const [alerta, setAlerta] = useState<IMessage>({alert: false, message: "", type: undefined})
    const rota = useRouter();

    const alertar = (aviso: string, tempo: number, type: AlertColor | undefined) => {
        setAlerta({
            alert: true,
            message: aviso,
            type: type
        });
        setTimeout(()=>{
            setAlerta({
                alert: false,
                message: "",
                type: undefined
            });
        }, tempo);
    }

    useEffect(() => {
        async function checkJwtTokenIvalid() {
            try {
                const res = await api.get('/');
                if (res && rota.asPath == "/signIn") rota.push("/")
                return;
            } catch (error: any) {
                setLoad(true);
                if (rota.asPath !== "/signIn" && rota.asPath !== "/signUp"){
                    signOut();
                    alertar("Faça login.", 5000, "error");
                }
            }
        } 

        async function userInCache() {
            const userLocal = localStorage.getItem('user');
            const tokenLocal = localStorage.getItem('token');
            
            if(!userLocal && !tokenLocal && rota.asPath != "/signUp"){
                return rota.push("/signIn")
            }

            if ((userLocal && tokenLocal) && userLocal != undefined) {  
                const response = JSON.parse(userLocal);
                setUsuario(response);
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenLocal}`;
            }
            setLoad(true);
        }

        userInCache();
        checkJwtTokenIvalid();
    }, []);

    async function signIn(email: string, senha: string): Promise<any> {
        try{
            const response = await api.post("estudante/login", JSON.stringify({email, senha}));
            setUsuario(response.data.estudante);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            localStorage.setItem('user', JSON.stringify(response.data.estudante));
            localStorage.setItem('token', response.data.token);
            rota.push('/')
        }
        catch(err: any){
            alertar( err.response.data.message, 1500, "error");
            return;
        }
    }

    async function signOut() {
        setUsuario(null);
        await localStorage.clear();
        rota.push('/signIn');
    }

    async function reset(email: string){
        if (!validator.isEmail(email)) {
            console.log("Está")
            alertar("Informe um email válido", 1500, "error")
            return false;
        }
        try {
            const response = await api.post("estudante/resetPassword", { email });
            alertar(response.data.message, 2000, "success");
        } catch (err: any) {
            alertar(err.response.data.message, 1500, "error");
            return false;
        }
    }

    async function create(user: INewUser) {
        if(validarUser(user)){
            const formData = new FormData();
            formData.append("nome", user.nome);
            formData.append("email", user.email);
            formData.append("senha", user.senha);
            formData.append("imagemPerfil", user?.image);

            api.post("estudante/create", formData, {headers: { "Content-Type": "multipart/form-data" },})
                .then((res: any) => {
                    alertar(res.data.message, 3000, "success");
                    rota.push("/signIn")
                })
                .catch((err: any) => {
                    alertar(err.response.data.message, 2500, "error");
                })
        }
    }

    async function createGroup(group: Omit<IGroup, '_id'>) {
    
        if (group.meta.trim() == '' || group.dia.trim() == '' ||
            group.descricao.trim() == '') {
            alertar("Preencha todos os campos", 2000, "error");
            return;
        }
        
        if (usuario?._id) {
            const data = {
                estudanteId: usuario._id,
                meta: group.meta,
                dia: group.dia,
                descricao: group.descricao
            }
            api.post(`grupo/create`, JSON.stringify(data))
                .then((res: any) => {
                    rota.push(`/grupo/${res.data._id}`)
                })
                .catch((err: any) => {
                    alertar(err.response.data.message, 2500, "error");
                })
        }
    }

    function validarUser(user: INewUser): boolean{

        // verificar demais campos
        if (user.nome.trim() == '' || user.email.trim() == '' ||
            user.senha.trim() == '' || user.confirmeSenha.trim() == '') {
            alertar("Preencha todos os campso", 1500, "error");
            return false;
        }
        // verificar email
        if (!validator.isEmail(user.email)) {
            alertar("Preencha um email válido", 1500, "error");
            return false;
        }

        // verificar senha
        if (!schema.validate(user.senha)) {
            alertar("Senha deve ter no minimo 8 caracteres e conter letras minúsculas e maiúsculas.", 1500, "error");
            return false;
        }

        // verificar senha e confirmar senha
        if (user.senha != user.confirmeSenha) {
            alertar("Senha e Confirmar senha não são iguais", 1500, "error");
            return false;
        }

        return true;
    }

    function sendDoc(documento: IUploadDoc, grupoID: string, setDocs: Function){
        const formData = new FormData();
        formData.append("file", documento.documento);
        formData.append("descricao", documento.descricao);
        formData.append("grupoId", grupoID);

        api.post('documento/send', formData, {headers: { "Content-Type": "multipart/form-data" },})
            .then((res: any) => {
                alertar(res.data.message, 1500, "success");
                setDocs(res.data.arquivos);
            })
            .catch((err: any) => {
                console.log(err);
                alertar(err.response.data.message, 2500, "error");
            });
    }

    function joinGroup(estudanteId: string, grupoId: string){
        
        api.post('grupo/join', JSON.stringify({estudanteId, grupoId}))
            .then((res: any) => {
                rota.push(`/grupo/${res.data._id}`);
                alertar(`Agora você faz patre do grupo ${res.data.meta}`, 5000, "success");
            })
            .catch((err: any) => {
                alertar(err.response.data.message, 2500, "error");
            })
    }

    function leaveGroup(estudanteId: string, grupoId: string){
        
        api.post('grupo/leave', {estudanteId, grupoId})
            .then((res: any) => {
                rota.push(`/`);
                alertar(res.data.message, 5000, "success");
            })
            .catch((err: any) => {
                console.log(err)
                alertar(err.response.data.message, 4000, "error");
            })
    }

    function modifyPassword(senhaAtual: string, novaSenha: string) {
        const data = {
            estudanteId: usuario!._id,
            senhaAtual, novaSenha
        }
        api.post("estudante/modifyPassword", data)
            .then((res: any) => {
                alertar(res.data.message, 3000, "success");
            })
            .catch((err: any) => {
                console.log(err)
                alertar(err.response.data.message, 2500, "error");
            });
    }

    function modifyImage(file: any) {
        const formData = new FormData();
        formData.append("imagemPerfil", file);
        formData.append("estudanteId", usuario!._id);

        api.put("estudante/modifyImage", formData, {headers: { "Content-Type": "multipart/form-data" },})
            .then((res: any) => {
                alertar('Imagem de perfil atualizada', 3000, "success");
                setUsuario(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch((err: any) => {
                alertar(err.response.data.message, 2500, "error");
            });
    }

    return(
        <AuthContext.Provider value={{api, usuario, signIn, signOut,
            alerta, load, create, reset, alertar, createGroup, sendDoc,
            joinGroup, leaveGroup, modifyPassword, modifyImage}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;