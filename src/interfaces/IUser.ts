interface IResource {
    _id: string,
    cloudinary_id: string,
    secure_url: string,
}

export default interface IUser {
    email: string,
    nome: string,
    _id: string,
    resource?: IResource,
};