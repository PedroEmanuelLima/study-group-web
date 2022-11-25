import IUser from "../interfaces/IUser"

const UserDefault: IUser = {
  email: "",
  nome: "",
  _id: "",
  resource: {
    _id: "",
    cloudinary_id: "",
    secure_url: "",
  },
  token: "",
}

export default UserDefault;