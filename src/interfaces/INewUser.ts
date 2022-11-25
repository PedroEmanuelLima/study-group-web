import IUser from "./IUser";
export default interface INewUser extends Omit<IUser, '_id'> {
    image?: any,
    senha: string,
    confirmeSenha: string,
}