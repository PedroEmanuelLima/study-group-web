export interface IDocumento {
    _id: string,
    cloudinary_id: string,
    secure_url: string,
    grupo: string,
    descricao: string,
};

export interface IUploadDoc {
    documento: any,
    descricao: string
}